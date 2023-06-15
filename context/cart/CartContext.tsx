import { createContext } from 'react';
import { ICartProduct, ShippingAddres } from '../../interfaces';

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

  //orders
  creatOrder:() => Promise<{ hasError: boolean; message: string; }>
  
}

export const CartContext = createContext({} as contextProps); 