import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

interface contextProps { 
  cart : ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;

  // methods
  addProductTocart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCardProduct: (product: ICartProduct) => void;

}

export const CartContext = createContext({} as contextProps); 