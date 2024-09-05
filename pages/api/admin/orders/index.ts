import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { IOrder } from '../../../../interfaces';
import { Order } from '../../../../models';

type Data = { message: string } | IOrder | IOrder[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'PUT':
      return updatedOrder(req, res);

    case 'GET':
      return getOrders(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const updatedOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { orderId = '', status = '' } = req.body;

  await db.connect();
  await Order.findByIdAndUpdate(orderId, { orderState: status });
  await db.disconnect();
  0;
  return res.status(201).json({ message: 'Change Orders Status.' });
};

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { isPaid, orderState } = req.query;
  let filter = {};
  if (orderState !== undefined) {
    filter = { isPaid, orderState };
  }
  
  await db.connect();
  const orders = await Order.find(filter)
    .sort({ createdAt: 'desc' })
    .populate('user', 'name email')
    .lean();
  await db.disconnect();

  return res.status(200).json(orders as any);
};
