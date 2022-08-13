export interface IAddress {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  zip: string;
  city: string;
  country: string;
  phone: string;

  createdAt?: string;
  updatedAt?: string;
}
