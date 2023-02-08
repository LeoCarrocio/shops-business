import { ICartProduct } from '../../interfaces'
import { CartState } from './'

type CartActionType = | { type: '[Cart] - LoadCart cookies | storage', payload: ICartProduct[]}
| { type: '[Cart] - Add Product', payload: ICartProduct} 

export const cartReducer = (state:CartState, action:CartActionType):CartState => {

  switch (action.type) {
    
    case '[Cart] - LoadCart cookies | storage':
      return {
        ...state,
      };
    case '[Cart] - Add Product':
      return {
        ...state,
      }

    default: 
      return state
  }


} 