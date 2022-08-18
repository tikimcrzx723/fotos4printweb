import moongose, { model, Model, Schema } from 'mongoose';
import { IOrder } from '../interfaces/order';

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        title: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        userImages: [
          { image: { type: String }, quantity: { type: Number, default: 1 } },
        ],
      },
    ],
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      address2: { type: String },
      zip: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },
    numberOfItems: { type: Number, required: true },
    delivery: {
      price: { type: Number, default: 15 },
      required: { type: Boolean, default: true },
    },
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    transactionId: { type: String },
    paidMetod: { type: String, enum: ['paypal', 'square'] },
    orderState: {
      type: String,
      enum: {
        values: ['pending', 'processing', 'completed'],
        message: '{VALUE} is not a valid state',
      },
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  moongose.models.Order || model('Order', orderSchema);

export default Order;
