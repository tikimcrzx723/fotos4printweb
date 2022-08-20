export interface IProduct {
  _id?: string;
  title: string;
  description: string;
  images: string[];
  price: IPrice[];
  needImages?: boolean;
  minIMages?: number;
  slug: string;
  tags: string[];
  type: string;

  // TODO: agregar createdAt y updatedAt
  createdAt?: string;
  updatedAt?: string;
}

export interface IPrice {
  size: string;
  priceClient: number;
  priceFerderal: number;
  priceFrequnt: number;
}
