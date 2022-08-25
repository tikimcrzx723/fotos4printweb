import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../../database';
import { IUserOrder } from '../../../../../interfaces';
import { Order } from '../../../../../models';

type Data = { name: string } | IUserOrder[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getOrdersByUsers(req, res);

    default:
      break;
  }
}

const getOrdersByUsers = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { user } = req.query;
  
  await db.connect();
  const orders = await Order.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'usr',
      },
    },
    { $unwind: '$usr' },
    {
      $group: {
        _id: '$user',
        orders: { $sum: 1 },
        total: { $sum: '$total' },
        items: { $sum: '$numberOfItems' },
        paid: { $addToSet: '$isPaid' },
        user: { $addToSet: '$usr' },
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 1,
        'user.email': 1,
        'user.name': 1,
        orders: 1,
        total: 1,
        items: 1,
        paid: 1,
      },
    },
    { $match: { 'user._id': user } },
  ]);
  await db.disconnect();

  return res.status(200).json(orders);
};
