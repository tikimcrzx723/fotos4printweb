import type { NextApiRequest, NextApiResponse } from 'next';
import { Client, Environment } from 'square';
import { randomUUID } from 'crypto';

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

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

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // TODO: validar sesión del usuario
  // const session: any = await getSession({ req });
  // if (!session) {
  //   return res
  //     .status(401)
  //     .json({ message: 'You must be authenticated to do this.' });
  // }

  const { result } = await paymentsApi.createPayment({
    idempotencyKey: randomUUID(),
    sourceId: req.body.sourceId,
    amountMoney: {
      currency: 'USD',
      amount: BigInt(100),
    },
  });
  console.log(result);
  res.status(200).json({ message: 'ok' });
};
