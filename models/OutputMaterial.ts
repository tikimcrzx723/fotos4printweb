import mongoose, { Schema, Model, model } from 'mongoose';
import { IOutputMaterial } from '../interfaces';

const outputMaterialSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', unique: true },
    quantity: { type: Number },
  },
  { timestamps: true }
);

const OutputMaterial: Model<IOutputMaterial> =
  mongoose.models.OutputMaterial ||
  model('OutputMaterial', outputMaterialSchema);

export default OutputMaterial;
