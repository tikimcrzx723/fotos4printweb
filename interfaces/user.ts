import moongose from 'mongoose';
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  isActive?: boolean;
  address?: string | moongose.Types.ObjectId | null | undefined;

  // TODO: agregar createdAt y updatedAt
  createdAt?: string;
  updatedAt?: string;
}
