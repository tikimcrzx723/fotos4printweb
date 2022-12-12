import moongose, { model, Model, Schema } from 'mongoose';

const orderGuestSchema = new Schema(
  {
    orderItems: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        title: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        needImages: { type: Boolean, required: true },
        price: { type: Number, required: true },
        userImages: [
          {
            image: { type: String },
            quantity: { type: Number, default: 1 },
            information: { type: Object },
          },
        ],
        information: { type: Object, default: { none: false } },
      },
    ],
    pickUpStore: {
      company: { type: String, required: true },
      address: { type: String, required: true },
      address2: { type: String },
      zip: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      phone: { type: String, required: true },
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
    coupon: { type: Schema.Types.ObjectId, ref: 'CuponCode' },
  },
  { timestamps: true }
);
