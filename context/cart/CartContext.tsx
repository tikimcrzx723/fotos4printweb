import { createContext } from 'react';
import { ICartProduct, IShippingAddress } from '../../interfaces';

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: IShippingAddress;

  // Methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (address: IShippingAddress) => void;

  // Orders
  createOrder: () => Promise<{
    hasError: boolean;
    message: string;
  }>;

  // Address Up
  addAdress: (address: IShippingAddress) => Promise<{
    hasError: boolean;
    message: string;
  }>;
}

export const CartContext = createContext({} as ContextProps);
