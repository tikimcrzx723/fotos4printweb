import type { NextApiRequest, NextApiResponse } from 'next';
import { IAddress } from '../../../../../interfaces';
import mongoose from 'mongoose';
import { db } from '../../../../../database';
import { Address, User } from '../../../../../models';

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
  const user = await User.findById(userId).populate('address')
  await db.disconnect();

  if (user?.address) return res.status(200).json(user.address as any)
  else return res.status(404).json(null)
};
