import mongoose, { Schema, Model, model } from 'mongoose';
import { IShippingAddress } from '../interfaces';

const addressSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    address2: { type: String },
    zip: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const Address: Model<IShippingAddress> =
  mongoose.models.Address || model('Address', addressSchema);

export default Address;
