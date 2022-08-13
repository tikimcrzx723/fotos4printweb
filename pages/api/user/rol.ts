import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getRoleUser(req, res);
      break;

    default:
      break;
  }
}

const getRoleUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session !== null)
    return res.status(201).json({ message: session.user.role });
  else return res.status(201).json({ message: 'client' });
};
