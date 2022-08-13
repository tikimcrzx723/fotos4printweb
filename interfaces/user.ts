import moongose from 'mongoose';
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  address?: string | moongose.Types.ObjectId;

  // TODO: agregar createdAt y updatedAt
  createdAt?: string;
  updatedAt?: string;
}
