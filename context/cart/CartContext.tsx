import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';
import { ShippingAddres } from './';

interface contextProps { 
  cart : ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;

  shippinAddress?: ShippingAddres;

  // methods
  addProductTocart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCardProduct: (product: ICartProduct) => void;
  updateAddres: (data: ShippingAddres) => void
  

}

export const CartContext = createContext({} as contextProps); 