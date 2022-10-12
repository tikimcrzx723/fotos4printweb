import { IProduct, IMaterial } from './';

export interface IProductInventory {
  product: IProduct;
  necessaryMaterial: INecessaryMaterial;
}

export interface INecessaryMaterial {
  material: IMaterial;
  quantity: number;
  unitary: boolean;
}
