import { IOrderItem } from './order';
import { IUser } from './user';

export interface IUserImages {
  _id: string;
  user?: IUser;
  orderItems: IOrderItem[];
}
