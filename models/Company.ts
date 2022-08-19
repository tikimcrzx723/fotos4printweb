import mongoose, { Schema, Model, model } from 'mongoose';
import { ICompany } from '../interfaces';

const CompanySchema = new Schema(
  {
    name: { type: String, required: true },
    deliveryPrice: { type: Number, required: true },
    minFreeDelivery: { type: Number, required: true },
    address: { type: String, required: true },
    address2: { type: String },
    zip: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const Company: Model<ICompany> =
  mongoose.models.Company || model('Company', CompanySchema);

export default Company;
