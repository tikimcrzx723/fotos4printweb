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
  paidMetod?: 'paypal' | 'square';

  delivery?: IDelivery;

  transactionId?: string;

  createdAt?: string;
  updatedAt?: string;
  orderState?: 'pending' | 'processing' | 'completed';
}

export interface IDelivery {
  price: number;
  required: boolean;
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
  minIMages?: number;
  needImages?: boolean;
}

interface IUserImages {
  image: string;
  quantity: number;
}

export interface IShippingAddress {
  _id?: string;
  user?: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  state: string;
  phone: string;
}
