import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database/';
import { User } from '../../../models';
import bcryptjs from 'bcryptjs';
import { jwt } from '../../../utils';

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        email: string;
        role: string;
        name: string;
        isActive: boolean | undefined;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return loginUser(req, res);
    default:
      res.status(400).json({ message: 'Bad Request' });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '' } = req.body;

  await db.connect();
  const user = await User.findOne({ email }).lean();

  await db.disconnect();

  if (!user) {
    return res.status(400).json({ message: 'Correo o contraseña no válidos' });
  }

  if (!bcryptjs.compareSync(password, user.password!)) {
    return res.status(400).json({ message: 'Correo o contraseña no válidos' });
  }

  const { _id, role, name, isActive } = user;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      role,
      name,
      isActive,
    },
  });
};
