import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { isValidObjectId } from 'mongoose';
import { IPaypal } from '../../../../interfaces';
import { db } from '../../../../database';
import { Order } from '../../../../models';
import { sendOrder } from '../../../../libs/mails';
import { sendOrderMessage } from '../../../../msn';

type Data = {
  message: string;
};

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

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAl_SECRET;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');
  const body = new URLSearchParams('grant_type=client_credentials');

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || '',
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }

    return null;
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

  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    return res.status(400).json({ message: 'Unable to confirm paypal token' });
  }

  const { transactionId = '', orderId = '' } = req.body;

  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    }
  );

  if (data.status !== 'COMPLETED') {
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

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: 'Paypal amounts and our order are not the same.' });
  }

  const ordCompleted = await Order.findByIdAndUpdate(orderId, {
    transactionId,
    isPaid: true,
    paidMetod: 'paypal',
    orderState: 'processing',
  });

  const sendOrderMail = await sendOrder(
    session.user.email,
    'no-reply@fotos4print.com',
    'Order Ticket',
    'Its a ticket no invoice',
    ordCompleted?._id!,
    ordCompleted?.orderItems!,
    session.user.name,
    ordCompleted?.total!
  );

  const message = `New Order by ${session.user.email} and order id ${ordCompleted?._id}`;

  await sendOrderMessage('+15039904525', message);
  await sendOrderMessage('+15595072896', message);
  await sendOrderMessage('+15418623584', message);

  await db.disconnect();

  return res.status(200).json({ message: 'Order Paid' });
};
