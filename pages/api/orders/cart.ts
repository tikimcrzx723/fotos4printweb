import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'redis-om';
import { getToken } from 'next-auth/jwt';
import { IUserImages } from '../../../interfaces';

type Data =
  | {
      message: string;
    }
  | IUserImages
  | null
  | [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return sendCart(req, res);

    case 'GET':
      return getCart(req, res);

    case 'DELETE':
      return removeCart(req, res);

    default:
      break;
  }
}

const sendCart = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must be authenticated to do this.' });
  }

  const { body } = req;
  try {
    const client = await new Client();
    await client.open(process.env.REDIS_KEY!);
    await client.set(`[CART]-${session.user._id}`, JSON.stringify(body));
    await client.close();
    res.status(201).json({ message: 'Data Insert Correctly' });
  } catch (error) {
    console.log(error);
  }
};

const getCart = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return res.status(200).json([]);
  }

  const client = new Client();
  await client.open(process.env.REDIS_KEY!);
  const cacheData = await client.get(`[CART]-${session.user._id}`);

  await client.close();
  if (cacheData) {
    return res.status(200).json(JSON.parse(cacheData!) as any);
  }

  return res.status(200).json([]);
};

const removeCart = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must be authenticated to do this.' });
  }

  const client = new Client();
  await client.open(process.env.REDIS_KEY!);
  await client.execute(['DEL', `[CART]-${session.user._id}`]);
  await client.close();

  return res.status(200).json(null);
};
