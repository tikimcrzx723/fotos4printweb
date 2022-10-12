import mongoose, { Schema, Model, model } from 'mongoose';
import { IMaterial } from '../interfaces';

const materialSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    heavy: { type: String },
    area: { type: Number },
    package: { type: Number },
    size: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

const Material: Model<IMaterial> =
  mongoose.models.Material || model('Material', materialSchema);

export default Material;
