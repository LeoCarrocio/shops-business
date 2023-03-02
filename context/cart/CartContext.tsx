import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';
import { ShippinAddres } from './';

interface contextProps { 
  cart : ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;

  shippinAddress?: ShippinAddres;

  // methods
  addProductTocart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCardProduct: (product: ICartProduct) => void;
  updateAddres: (data: ShippinAddres) => void
  

}

export const CartContext = createContext({} as contextProps); 