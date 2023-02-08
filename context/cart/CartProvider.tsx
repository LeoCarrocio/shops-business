import {FC, useReducer,ReactNode } from 'react';

import { CartContext, cartReducer } from './';
import { ICartProduct } from '../../interfaces';

interface Props { 
  children: ReactNode
}

export interface CartState {
  cart: ICartProduct[]
}

const CART_INITIAL_STATE : CartState = {
  cart: [],
}

export const CartProvider:FC<Props> = ({children}) =>{

  const [state, dispatch] = useReducer( cartReducer, CART_INITIAL_STATE )

  

  return (
    <CartContext.Provider value={{
      ...state,
      // METHODS
      
    }
    } >
    {children}
    </CartContext.Provider>
  ) 

}