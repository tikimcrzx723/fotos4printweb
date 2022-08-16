import type { NextApiRequest, NextApiResponse } from 'next';
import { Client, Environment } from 'square';
import { randomUUID } from 'crypto';
import { ISquare } from '../../../../interfaces';
import axios from 'axios';
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

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

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { result } = await paymentsApi.createPayment({
    idempotencyKey: randomUUID(),
    sourceId: req.body.sourceId,
    amountMoney: {
      currency: 'USD',
      amount: BigInt(100),
    },
  });
  const dre = await getPayOrder(result.payment?.id as any);
  console.log(dre);

  res.status(200).json(result as any);
};

const getPayOrder = async (invoice_id: string): Promise<any | null> => {
  const SQUARE_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
  console.log(SQUARE_TOKEN);

  try {
    const { data } = await axios.get(
      `https://connect.squareupsandbox.com/v2/payments/${invoice_id}`,
      {
        headers: {
          Authorization: `Bearer EAAAENwhmZPwkgPp_-x5YDgpBf4b_au34V8XWjXsX3-sMFyCKCoNTTX2USrAbDyB`,
          'Square-Version': '2022-07-20',
          'Content-Type': 'application/json',
        },
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }

    return null;
  }
};
