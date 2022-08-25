import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
  }
}

const sendOrderMail = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  switch (req.method) {
    case 'POST':
      return sendOrder(req, res);

    default:
      break;
  }
};

const sendOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, text, html } = req.body;
  
};
