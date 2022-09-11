import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { CuponCode, Order, UserCuponCode } from '../../../../models';
import moment from 'moment';
import { getToken } from 'next-auth/jwt';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return applyCoupon(req, res);

    default:
      break;
  }
}

const applyCoupon = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session.user.role !== 'client') {
    return res.status(201).json({
      message: 'sorry coupons are only valid for customer type users.',
    });
  }

  const { user, cupon, orderId } = req.body;
  await db.connect();
  const coupon = await CuponCode.findOne({ code: cupon });
  if (!coupon) {
    await db.disconnect();
    return res.status(200).json({ message: "coupon doesn't exist" });
  }
  const minimumPurchase = coupon!.minimumPurchase;
  const couponId = coupon!._id;
  const discount = coupon!.discount;
  const numCupons = coupon!.numCupons;
  const createdAt = coupon!.createdAt;
  const appliedCoupons = coupon!.appliedCoupons;
  const monthValid = moment(createdAt).month;
  const currentMonth = moment(Date.now()).month;

  if (monthValid !== currentMonth) {
    await db.disconnect();
    return res.status(200).json({ message: 'Coupon has expired' });
  }

  if (numCupons <= appliedCoupons!) {
    await db.disconnect();
    return res
      .status(200)
      .json({ message: 'Coupons are no longer out of stock' });
  }

  const countCouponsByUser = await UserCuponCode.count({
    user,
    cupon: couponId,
  });

  if (countCouponsByUser >= 1) {
    await db.disconnect();
    return res.status(200).json({ message: 'Already Used Coupon' });
  }

  const order = await Order.findById(orderId);
  const total = order?.total;

  if (total! < minimumPurchase) {
    await db.disconnect();
    return res.status(200).json({
      message: `The Minimum Purchase For Coupon Is: ${minimumPurchase}`,
    });
  }

  const userCoupon = new UserCuponCode({ user, cupon: couponId });
  await userCoupon.save();

  await Order.findByIdAndUpdate(orderId, {
    total: total! - discount,
    coupon: couponId,
  });

  await CuponCode.findOneAndUpdate(
    { code: cupon },
    { appliedCoupons: appliedCoupons! + 1 }
  );

  await db.disconnect();

  return res.status(201).json({ message: 'Coupon Applied Correctly' });
};
