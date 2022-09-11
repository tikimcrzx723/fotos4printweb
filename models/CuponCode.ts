import mongoose, { Schema, Model, model } from 'mongoose';
import { ICuponCode } from '../interfaces';

const cuponCodeSchema = new Schema(
  {
    code: { type: String, required: true },
    numCupons: { type: Number, required: true },
    appliedCoupons: { type: Number, default: 0 },
    minimumPurchase: { type: Number, required: true },
    discount: { type: Number, required: true },
  },
  { timestamps: true }
);

const CuponCode: Model<ICuponCode> =
  mongoose.models.CuponCode || model('CuponCode', cuponCodeSchema);

export default CuponCode;
