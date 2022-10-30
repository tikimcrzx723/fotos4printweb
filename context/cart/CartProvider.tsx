import { FC, PropsWithChildren, useEffect, useReducer } from 'react';

import {
  IAddress,
  ICartProduct,
  IOrder,
  IShippingAddress,
} from '../../interfaces';
import { CartContext, cartReducer } from './';
import Cookies from 'js-cookie';
import { appApi } from '../../api';
import axios from 'axios';

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: IShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

interface Props {}

export const CartProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookies.get('cart')
        ? JSON.parse(Cookies.get('cart')!)
        : [];
      dispatch({
        type: '[Cart] - LoadCart from cookies | storage',
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: '[Cart] - LoadCart from cookies | storage',
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    Cookies.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );

    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
  }, [state.cart]);

  useEffect(() => {
    if (Cookies.get('firstName')) {
      const shipingAddress = {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        state: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
      };

      dispatch({
        type: '[Cart] - LoadAddress from cookies',
        payload: shipingAddress,
      });
    }
  }, []);

  const updateRepitElements = (product: ICartProduct, index: number) => {
    const productInCart = state.cart;
  };

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some(
      (p) => p._id === product._id && p.size
    );

    if (!productInCart) {
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product],
      });
    }

    const productInCartButDiferenceSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );

    if (!productInCartButDiferenceSize) {
      return dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product],
      });
    }

    //Acomulate products
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      return p;
    });

    dispatch({
      type: '[Cart] - Update products in cart',
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Change cart quantity', payload: product });
  };

  const updateCartProductsByCache = (products: ICartProduct[]) => {
    dispatch({ type: '[Cart] - Update products in cart', payload: products });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: product });
  };

  const updateAddress = async (address: IShippingAddress) => {
    const body: any = {
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      zip: address.zip,
      city: address.city,
      state: address.state,
      phone: address.phone,
    };

    try {
      const { data } = await appApi.put<IAddress>('/user/address', body);
      // TODO: Dispatch
      dispatch({ type: '[Cart] - Add Address' });
      return {
        hasError: false,
        message: data._id!,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data + '',
        };
      }
      return {
        hasError: true,
        message: 'Error no controlado, hable con el administrador',
      };
    }
  };

  const addAdress = async (
    address: IShippingAddress
  ): Promise<{ hasError: boolean; message: string }> => {
    const body: any = {
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      zip: address.zip,
      city: address.city,
      state: address.state,
      phone: address.phone,
    };

    try {
      const { data } = await appApi.post<IAddress>('/user/address', body);
      // TODO: Dispatch
      dispatch({ type: '[Cart] - Add Address' });
      return {
        hasError: false,
        message: data._id!,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message:
            error.response?.data +
            'Uncontrolled error, talk to the administrator',
        };
      }
      return {
        hasError: true,
        message: 'Uncontrolled error, talk to the administrator',
      };
    }
  };

  const createOrder = async (
    delivery = true
  ): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    let address = null;
    let priceDelivery = 0;
    const { data } = await appApi.get('/perfil/company');
    const company = data;

    if (delivery) {
      priceDelivery =
        state.total >= Number(company.minFreeDelivery)
          ? 0
          : Number(company.deliveryPrice);
      const { data } = await appApi.get('/user/address');
      address = data;
    } else {
      address = {
        firstName: company.name,
        lastName: ' ',
        address: company.address,
        address2: company.address2,
        zip: company.zip,
        city: company.city,
        state: company.state,
        phone: company.phone,
      };
    }

    const body: any = {
      orderItems: state.cart.map((p) => ({
        ...p,
        size: p.size!,
      })),
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total + priceDelivery,
      isPaid: false,
      shippingAddress: address,
      delivery: {
        price: priceDelivery,
        required: delivery,
      },
    };

    try {
      const { data } = await appApi.post<IOrder>('/orders', body);
      // TODO: Dispatch
      dispatch({ type: '[Cart] - Order complete' });
      return {
        hasError: false,
        message: data._id!,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data + '',
        };
      }
      return {
        hasError: true,
        message: 'Uncontrolled error, talk to the administrator',
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        // Methods
        updateRepitElements,
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
        updateCartProductsByCache,

        // Orders
        createOrder,
        addAdress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
