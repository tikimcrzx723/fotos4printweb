import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { CuponCode } from '../../../../models';

type Data = { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createCoupon(req, res);

    case 'GET':
      return getCoupon(req, res);

    default:
      break;
  }
}

const createCoupon = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { body } = req;
  console.log(body);
  

  await db.connect();
  const cupon = new CuponCode(body);
  await cupon.save();
  await db.disconnect();

  return res.status(201).json({ message: 'Coupon Successfully Created' });
};

const getCoupon = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const cupons = await CuponCode.find();
  await db.disconnect();

  return res.status(200).json(cupons as any);
};
