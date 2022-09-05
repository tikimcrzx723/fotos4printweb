import type { NextApiRequest, NextApiResponse } from 'next';
import { IAddress } from '../../../../../interfaces';
import mongoose from 'mongoose';
import { db } from '../../../../../database';
import { Address } from '../../../../../models';

type Data =
  | {
      message: string;
    }
  | IAddress
  | null;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getAddress(req, res);

    default:
      break;
  }
}

const getAddress = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId } = req.query;

  if (mongoose.isValidObjectId(userId)) {
    return res.status(200).json({ message: 'Not found address' });
  }

  await db.connect();
  const address = await Address.findOne({ user: userId });
  await db.disconnect();

  if (address) return res.status(200).json(address as IAddress);
  else return res.status(404).json(null);
};
