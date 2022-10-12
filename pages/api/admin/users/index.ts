import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { IUser } from '../../../../interfaces';
import { User } from '../../../../models';

type Data = { message: string } | IUser[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res);
      break;

    case 'PUT':
      return updateUser(req, res);
      break;

    default:
      return res.status(400).json({ message: 'Bad Request' });
      break;
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const users = await User.find().select('-password').lean();
  await db.disconnect();
  return res.status(200).json(users);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = '', role = '' } = req.body;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: 'No user exists for this id.' });
  }

  const validRoles = ['admin', 'client', 'federal', 'frequent', 'torito-market'];
  if (!validRoles.includes(role)) {
    return res
      .status(400)
      .json({ message: `Role not allowed: ${validRoles.join(', ')}` });
  }

  await db.connect();
  const user = await User.findById(userId);

  if (!user) {
    await db.disconnect();
    return res.status(404).json({ message: `User not found: ${userId}` });
  }

  user.role = role;
  await user.save();
  await db.disconnect();

  return res.status(200).json({ message: 'User updated.' });
};
