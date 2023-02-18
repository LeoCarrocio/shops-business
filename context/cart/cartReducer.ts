import { ICartProduct } from '../../interfaces'
import { CartState } from './'

type CartActionType = | { type: '[Cart] - LoadCart cookies | storage', payload: ICartProduct[] }
| { type: '[Cart] - Update products in cart', payload: ICartProduct[] }
| { type: '[Cart] - Change cart quantity', payload: ICartProduct }
| { type: '[Cart] - Remove productin cart', payload: ICartProduct }
| { type: '[Cart] - Update order summary', 
    payload: {
      numberOfItems: number;
      subTotal: number;
      tax: number;
      total: number;
    }
  }

export const cartReducer = (state:CartState, action:CartActionType):CartState => {

  switch (action.type) {
    
    case '[Cart] - LoadCart cookies | storage':
      return {
        ...state,
        cart: [...action.payload]
      };
    case '[Cart] - Update products in cart':
      return {
        ...state,
        cart: [...action.payload]
      }
    case '[Cart] - Change cart quantity':
      return {
        ...state,
        cart: state.cart.map( product => {
          if( product._id !== action.payload._id) return product;
          if( product.sizes !== action.payload.sizes) return product;

          return action.payload // como encunatra al producto ya modificado con la cantidad lo agrage xq ya son iguales el ai y el size
        })
      }
    case '[Cart] - Remove productin cart':
      return {
        ...state,
        cart: state.cart.filter(produc => !( produc._id === action.payload._id && produc.sizes === action.payload.sizes))// se filtra el producto q no es y lo desprecia 
      }
    case '[Cart] - Update order summary':
      return{
        ...state,
        ...action.payload
      }
      
    default: 
      return state
  }


} 