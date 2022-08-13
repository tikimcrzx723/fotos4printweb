import { IUser } from './';

export interface IOrder {
  _id?: string;
  user?: IUser;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentResult?: string;

  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  isPaid: boolean;
  paidAt?: string;

  transactionId?: string;

  createdAt?: string;
  updatedAt?: string;
  orderState?: 'pending' | 'processing' | 'completed';
}

export interface IOrderItem {
  _id: string;
  title: string;
  size: string;
  quantity: number;
  slug: string;
  image: string;
  price: number;
  userImages?: IUserImages[];
  tempImages?: string[];
}

interface IUserImages {
  image: string;
  quantity: number;
}

export interface IShippingAddress {
  user?: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}
