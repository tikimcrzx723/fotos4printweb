import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { Address, User } from '../../../models';
import { db } from '../../../database';
import { IShippingAddress } from '../../../interfaces';

type Data = { message: string } | IShippingAddress;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return addAddress(req, res);

    case 'PUT':
      return updateAddress(req, res);

    case 'GET':
      return getAddress(req, res);

    default:
      break;
  }
}

const addAddress = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  await db.connect();

  const address = new Address({ ...req.body });
  await address.save();
  await User.findByIdAndUpdate(session.user._id, {
    address: address._id,
  });

  await db.disconnect();

  return res.status(201).json(address);
};

const updateAddress = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  await db.connect();

  const user = await User.findById(session.user._id);
  const addressId = user?.address;
  await Address.findByIdAndUpdate(addressId, { ...req.body });
  const address = await Address.findById(session.user._id);

  await db.disconnect();

  return res.status(201).json(address as any);
};

const getAddress = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  await db.connect();

  const address = await User.findById(session.user._id)
    .populate('address')
    .lean();

  await db.disconnect();

  return res.status(201).json(address?.address as any);
};
