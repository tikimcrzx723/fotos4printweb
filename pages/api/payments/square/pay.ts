import type { NextApiRequest, NextApiResponse } from 'next';
import { Client, Environment, CompletePaymentRequest } from 'square';
import { randomUUID } from 'crypto';
import { ISquare } from '../../../../interfaces';
import { getSession } from 'next-auth/react';
import { isValidObjectId } from 'mongoose';
import { db } from '../../../../database';
import Order from '../../../../models/Order';
import axios from 'axios';
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const headers = {
  'Square-Version': process.env.SQUARE_VERSION!,
  Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN!}`,
  'Content-Type': 'application/json',
};

type Data =
  | {
      message: string;
    }
  | ISquare.Square;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);

    default:
      break;
  }
}

const getPayOrder = async (paymentId: string) => {
  try {
    const { data } = await axios.get(`${process.env.SQUARE_URL}/${paymentId}`, {
      headers,
    });
    return data;
  } catch (error) {}
};

const completeOrder = async (paymentId: string, versionToken: string) => {
  const body = {
    version_token: versionToken,
  };
  try {
    const { data } = await axios.post(
      `${process.env.SQUARE_URL}/${paymentId}/complete`,
      body,
      {
        headers,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // TODO: valid session user
  const session: any = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must be authenticated to do this.' });
  }

  // TODO: valid mongoID
  if (!isValidObjectId(session.user._id)) {
    return res
      .status(400)
      .json({ message: 'This user is not recognized login' });
  }

  try {
    const { orderId, amount, sourceId } = req.body;
    const body = {
      amount_money: { amount, currency: 'USD' },
      idempotency_key: randomUUID(),
      source_id: sourceId,
    };

    const { data } = await axios.post('${process.env.SQUARE_URL}', body, {
      headers,
    });

    const paymentId = data.payment.id;
    const versionToken = data.payment.version_token;

    const completePayment = await completeOrder(paymentId, versionToken);
    const { payment } = await getPayOrder(paymentId);

    if (payment.status !== 'COMPLETED') {
      return res.status(401).json({ message: 'Order not recognized' });
    }

    await db.connect();
    const dbOrder = await Order.findById(orderId);

    if (!dbOrder) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: 'Order does not exist in our database' });
    }

    if (dbOrder.total !== payment.total_money.amount) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: 'Square amounts and our order are not the same.' });
    }

    await Order.findByIdAndUpdate(orderId, {
      transactionId: payment.id,
      isPaid: true,
      paidMetod: 'square',
      orderState: 'processing',
    });

    await db.disconnect();

    res.status(200).json({ message: 'Order has been paid' });
  } catch (error) {
    res.status(200).json(error as any);
  }
};