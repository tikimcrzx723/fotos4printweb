import { IProduct } from './product';

export interface IMaterial {
  _id?: string;
  name: string;
  quantity: number;
  description: string;
  heavy?: string;
  area?: number;
  package: number;
  size: string;
  products: IProduct[];
}
