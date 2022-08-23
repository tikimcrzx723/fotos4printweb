import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Product, Order } from '../../../models';

type Data = { message: string } | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total, delivery } = req.body as IOrder;

  // Verify that we have a user
  const session: any = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'You need a session' });
  }

  const rol = session.user.role;

  // Create an arrangement with the products that the person wants
  const productsIds = orderItems.map((product) => product._id);

  await db.connect();

  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      let currentPrice = null;

      if (rol === 'federal' || rol === 'admin') {
        currentPrice = dbProducts
          .find(
            (p) => new mongoose.Types.ObjectId(p._id).toString() === current._id
          )
          ?.price.find((si) => si.size === current.size)?.priceFerderal;
      } else if (rol === 'frequent') {
        currentPrice = dbProducts
          .find(
            (p) => new mongoose.Types.ObjectId(p._id).toString() === current._id
          )
          ?.price.find((si) => si.size === current.size)?.priceFrequnt;
      } else {
        currentPrice = dbProducts
          .find(
            (p) => new mongoose.Types.ObjectId(p._id).toString() === current._id
          )
          ?.price.find((si) => si.size === current.size)?.priceClient;
      }

      if (!currentPrice) {
        throw new Error('Check cart again, product does not exist');
      }

      return currentPrice * current.quantity + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = (subTotal + delivery?.price!) * (taxRate + 1);

    if (total !== backendTotal) {
      throw new Error('The total does not match the amount');
    }

    // All good up to this point
    const userId = session.user._id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    newOrder.total = Math.round(newOrder.total * 100) / 100;

    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (error: any) {
    await db.disconnect();
    console.log(error);
    res.status(400).json({
      message: error.message || 'Review server logs',
    });
  }
};

