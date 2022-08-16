import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces';

const productSchema = new Schema(
  {
    title: { type: String },
    description: { type: String, required: true, default: '' },
    images: [{ type: String }],
    price: [
      {
        size: { type: String },
        priceClient: { type: Number },
        priceFerderal: { type: Number },
        priceFrequnt: { type: Number },
      },
    ],
    minQuantity: { type: Number },
    needImages: { type: Boolean, default: true },
    quantityNeedImage: { type: Number },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    type: {
      type: String,
      enum: {
        values: ['photo', 'press', 'canva', 'gift'],
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
