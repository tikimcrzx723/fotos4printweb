import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { User } from '../../../../models';
import bcryptjs from 'bcryptjs';
import Recover from '../../../../models/Recover';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'PUT':
      return changePassword(req, res);

    default:
      break;
  }
}

const changePassword = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { newPassword, userId } = req.body;
  await db.connect();

  const password = bcryptjs.hashSync(newPassword);
  await User.findByIdAndUpdate(userId, { password });
  await Recover.findOneAndUpdate({ user: userId }, { changePassword: true });
  await db.disconnect();

  return res.status(201).json({ message: 'Change Password' });
};
