import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User, Order, Product } from '../../../models';

type Data = {
  numberOfOrders: number;
  paidOrders: number; // number orders is paid
  notPaidOrders: number;
  numberOfClients: number; // role: client
  numberOfProducts: number;
  productsWithNoInventory: number; // 0
  lowInventory: number; // products with menor 10
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getData(req, res);

    default:
      break;
  }
  //   res.status(200).json({ name: 'Example' });
}
const getData = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    User.find({ role: 'client' }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lte: 10 } }).count(),
  ]);

  await db.disconnect();

  res.status(200).json({
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders: numberOfOrders - paidOrders,
  });
};
