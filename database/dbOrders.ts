import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { IOrder } from '../interfaces';
import { Order } from '../models';

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await db.connect();
  const order = await Order.findById(id).lean();
  await db.disconnect();

  if (!order) {
    return null;
  }

  return JSON.parse(JSON.stringify(order));
};

export const getOrderByProduct = async (orderId: string, itemId: string, size: string) => {
  if (!isValidObjectId(orderId) || !isValidObjectId(itemId)) {
    return null;
  }

  await db.connect();
  const order = await Order.findById(orderId);
  if (!order) {
    return null;
  }

  const item: any = JSON.parse(JSON.stringify(order?.orderItems));

  await db.disconnect();

  return JSON.parse(
    JSON.stringify(item.find((it: { _id: string, size:string }) => it._id === itemId && it.size === size))
  );
};

export const getOrdersByUser = async (
  userId: string,
  limit = 2,
  skip = 1
): Promise<IOrder[]> => {
  if (!isValidObjectId(userId)) {
    return [];
  }

  await db.connect();
  const orders = await Order.find({ user: userId }).populate(
    'user',
    '_id email'
  );
  await db.disconnect();

  return JSON.parse(JSON.stringify(orders));
};

export const updateStateForOrder = async (
  orderId: string,
  status: 'pending' | 'processing' | 'completed'
) => {
  if (!isValidObjectId(orderId)) {
    return null;
  }

  await db.connect();
  const order = await Order.findByIdAndUpdate(orderId);

  if (!order) {
    await db.disconnect();
    return null;
  }

  order.orderState = status;
  await order.save();
  await db.disconnect();

  return JSON.parse(JSON.stringify(order));
};
