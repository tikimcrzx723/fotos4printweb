export interface ICuponCode {
  _id?: string;
  code: string;
  numCupons: number;
  minimumPurchase: number;
  appliedCoupons?: number;
  discount: number;

  createdAt?: string;
  updatedAt?: string;
}
