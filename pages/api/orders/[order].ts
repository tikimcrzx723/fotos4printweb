import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'PUT':
      return updateAddress(req, res);

    default:
      break;
  }
}

const updateAddress = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { order } = req.query;

  
};
