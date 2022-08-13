export interface IUserOrder {
  _id: string;
  orders: number;
  total: number;
  items: number;
  user: User;
}

interface User {
  name: string;
  email: string;
}
