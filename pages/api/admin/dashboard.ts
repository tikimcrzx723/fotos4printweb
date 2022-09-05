import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User, Order, Product } from '../../../models';

type Data = {
  numberOfOrders: number;
  completedOrders: number;
  paidOrders: number; // number orders is paid
  notPaidOrders: number;
  numberOfClients: number; // role: client
  numberOfProducts: number;
  productsWithNoInventory: number; // 0
  lowInventory: number; // products with menor 10
  userOrders: number;
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
    completedOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders,
    userOrders,
  ] = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true, orderState: 'completed' }).count(),
    Order.find({ isPaid: true, orderState: 'processing' }).count(),
    User.find({ role: { $ne: 'admin' } }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lte: 10 } }).count(),
    Order.find({ isPaid: false }).count(),
    (await Order.aggregate([{$group:{_id: '$user'}}])).length,
  ]);

  await db.disconnect();

  res.status(200).json({
    numberOfOrders,
    completedOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders,
    userOrders,
  });
};
