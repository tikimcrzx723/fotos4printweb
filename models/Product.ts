import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces';

const productSchema = new Schema(
  {
    title: { type: String },
    description: { type: String, required: true, default: '' },
    images: [{ type: String }],
    needDiscount: { type: Boolean },
    needComplement: { type: Boolean, default: false },
    price: [
      {
        size: { type: String },
        priceClient: { type: Number },
        priceFerderal: { type: Number },
        priceFrequnt: { type: Number },
        added: [
          {
            complement: { type: String, default: 'none' },
            client: { type: Number, default: 0 },
            frequent: { type: Number, default: 0 },
            federal: { type: Number, default: 0 },
          },
        ],
      },
    ],
    needImages: { type: Boolean, default: true },
    minIMages: { type: Number, default: 0 },
    onlyImage: { type: Boolean, default: false },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    type: {
      type: String,
      enum: {
        values: ['photo', 'press', 'gift'],
        message: '{VALUE} is not a valid type',
      },
      default: 'photo',
    },
  },
  { timestamps: true }
);

productSchema.index({ title: 'text', tags: 'text' });

const Product: Model<IProduct> =
  mongoose.models.Product || model('Product', productSchema);

export default Product;
