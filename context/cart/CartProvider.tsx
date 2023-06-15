import {FC, useReducer,ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie';
import { CartContext, cartReducer } from './';
import { ICartProduct, IOrder, ShippingAddres } from '../../interfaces';
import Cookies from 'js-cookie';
import tesloApi from '../../api/tesloApi';
import axios from 'axios';

interface Props { 
  children: ReactNode
}

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippinAddress?: ShippingAddres;
}

const CART_INITIAL_STATE : CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems:0,
  subTotal:0,
  tax:0,
  total:0,

  shippinAddress: undefined
}

export const CartProvider:FC<Props> = ({children}) =>{

  const [state, dispatch] = useReducer( cartReducer, CART_INITIAL_STATE );


  // cada useEffect se encarga de cada cosa 
  // guarda las coquies los elemnts del carrito 
  useEffect(()=>{
    try {
      const cookieProductsCart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')! )  : [] 
      dispatch({ type:'[Cart] - LoadCart cookies | storage' , payload: cookieProductsCart});
      
    } catch (error) {
      dispatch({ type:'[Cart] - LoadCart cookies | storage' , payload: []});
    }

  }, [])



useEffect(()=>{
    if( Cookies.get('firstName')){
      
      const shippingAddress = {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
      }
  
      dispatch({type:'[Cart] - LoadAddres from Cookies',payload: shippingAddress})
    }
  },[]);


  
  useEffect(()=>{
    
    if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart)); // se serealiza porque las cookies solo utiliza estring
  },[state.cart]);



  // se encarga de los valores del carrito del total a pagar 
  useEffect(()=>{

    const numberOfItems = state.cart.reduce((prev, current)=>current.quantity + prev, 0 );
    const subTotal = state.cart.reduce((prev, current)=> (current.quantity * current.price) + prev, 0 );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 1);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total : subTotal * (taxRate + 1)
    }
    dispatch({type: '[Cart] - Update order summary', payload:orderSummary})

  },[state.cart])

  
  const addProductTocart = (product: ICartProduct) =>{
    //nivel 1 
    // dispatch({ type:'[Cart] - Update products in cart', payload: product});

    // nivel final 
    // aca averiguo si existe el producto , productInCart devuelve un true si lo encuentra y un false si no 
    const productInCart = state.cart.some(p => p._id === product._id);
    if(!productInCart) return dispatch({ type:'[Cart] - Update products in cart' , payload: [...state.cart, product]}); // si no exixte entra y se guarda xq esta negado

    // aca averiguo si existe el producto y tambien la talla 
    const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
    if(!productInCartButDifferentSize) return dispatch({ type:'[Cart] - Update products in cart' , payload: [...state.cart, product]}); // exite el producto pero diferente talla entonses no tengo q acumular 

    // acumular

    const updatedProducts = state.cart.map( p =>{
      if(p._id !== product._id) return p;
      if(p.size !== product.size) return p;

      p.quantity += product.quantity

      return p 

    })

    dispatch({ type:'[Cart] - Update products in cart' , payload: updatedProducts}); 
  } 

  const updateCartQuantity = (product: ICartProduct) =>{
    dispatch({ type: '[Cart] - Change cart quantity' , payload: product}); 
  }

  const removeCardProduct =  (product: ICartProduct)=> {
    dispatch({ type: '[Cart] - Remove productin cart' , payload: product}); 
  }

  const updateAddres = (data: ShippingAddres) =>{

    Cookies.set('firstName',data.firstName);
    Cookies.set('lastName',data.lastName);
    Cookies.set('address',data.address);
    Cookies.set('address2',data.address2 || '');
    Cookies.set('zip',data.zip);
    Cookies.set('city',data.city);
    Cookies.set('country',data.country);
    Cookies.set('phone',data.phone);

    dispatch({type:'[Cart] - Update Addres' ,payload: data})
  }

  const creatOrder = async (): Promise<{hasError: boolean; message: string}> => {

    if( !state.shippinAddress ){
      throw new Error('No hay direecion de entrega');
    }

    const body : IOrder = {
      orderItems: state.cart.map(p => ({
        ...p,
        image: p.image!,
        size: p.size!
      })),
      shippingAddres: state.shippinAddress,
      numberOfOrderItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    }

    try {
      const {data} = await tesloApi.post<IOrder>('/orders', body)

      dispatch({type:'[Cart] - Order Complete'});

      return {
        hasError:false,
        message:data._id!
      }

    } catch (error) {
      // si es un error de axios 
      if(axios.isAxiosError(error)) {
        return{
          hasError:true,
          message:error.response?.data.message
        }
      }
      return{
        hasError:true,
        message:'Error no controlado, hable ocn el administrador'
      }

    }
  }


  return (
    <CartContext.Provider value={{
      ...state,
      // METHODS
      addProductTocart,
      updateCartQuantity,
      removeCardProduct,
      updateAddres,
      //Orders
      creatOrder,
    }
    } >
    {children}
    </CartContext.Provider>
  ) 

}