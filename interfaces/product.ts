export interface IProduct {
  _id?: string;
  title: string;
  description: string;
  images: string[];
  price: IPrice[];
  needImages?: boolean;
  needDiscount?: boolean;
  minIMages?: number;
  slug: string;
  tags: string[];
  type: string;
  onlyImage?: boolean;

  // TODO: agregar createdAt y updatedAt
  createdAt?: string;
  updatedAt?: string;
}

export interface IPrice {
  size: string;
  priceClient: number;
  priceFerderal: number;
  priceFrequnt: number;
  added?: IAdded[];
}

export interface IAdded {
  complement: string;
  client: number;
  frequent: number;
  federal: number;
}
