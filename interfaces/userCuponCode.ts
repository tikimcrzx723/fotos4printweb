import { IUser } from './user';
import { ICuponCode } from './cuponCode';

export interface IUserCuponCode {
  user: IUser;
  cupon: ICuponCode;

  createdAt?: string;
  updatedAt?: string;
}
