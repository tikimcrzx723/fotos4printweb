import type { NextApiRequest, NextApiResponse } from 'next';
import { sendOrderMessage } from '../../../../msn/orders/sendOrder';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return sendMessage(req, res);

    default:
      break;
  }
}

const sendMessage = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { phone, msn } = req.body;

  await sendOrderMessage('+1' + phone, msn);
  return res.status(200).json({ message: 'Sent Message' });
};
