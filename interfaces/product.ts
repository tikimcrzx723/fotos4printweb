export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  price: IPrice[];
  slug: string;
  tags: string[];
  title: string;
  type: string;

  // TODO: agregar createdAt y updatedAt
  createdAt: string;
  updatedAt: string;
}

export interface IPrice {
  size: string;
  priceClient: number;
  priceFerderal: number;
  priceFrequnt: number;
}
