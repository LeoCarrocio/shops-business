import {FC, useReducer,ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '../../interfaces';

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
}

const CART_INITIAL_STATE : CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems:0,
  subTotal:0,
  tax:0,
  total:0,
  
}

export const CartProvider:FC<Props> = ({children}) =>{

  const [state, dispatch] = useReducer( cartReducer, CART_INITIAL_STATE );



  useEffect(()=>{

    try {
      const cookieProductsCart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
      
      dispatch({ type:'[Cart] - LoadCart cookies | storage' , payload: cookieProductsCart});
      
    } catch (error) {
      dispatch({ type:'[Cart] - LoadCart cookies | storage' , payload: []});
    }

  }, [])
// cada useEffect se encarga de cada cosa 
// guarda las coquies los elemnts del carrito 
  useEffect(()=>{
    Cookie.set('cart', JSON.stringify(state.cart)); // se serealiza porque las cookies solo utiliza estring
  },[state.cart])

// se encarga de los valores del carrito del total a pagar 
  useEffect(()=>{

    const numberOfItems = state.cart.reduce((prev, current)=>current.quantity + prev, 0 );
    const subTotal = state.cart.reduce((prev, current)=> (current.quantity * current.price) + prev, 0 );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

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
    const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.sizes === product.sizes);
    if(!productInCartButDifferentSize) return dispatch({ type:'[Cart] - Update products in cart' , payload: [...state.cart, product]}); // exite el producto pero diferente talla entonses no tengo q acumular 

    // acumular

    const updatedProducts = state.cart.map( p =>{

      if(p._id !== product._id) return p;
      if(p.sizes !== product.sizes) return p;

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

  

  

  return (
    <CartContext.Provider value={{
      ...state,
      // METHODS
      addProductTocart,
      updateCartQuantity,
      removeCardProduct
    }
    } >
    {children}
    </CartContext.Provider>
  ) 

}