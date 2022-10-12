import moongose, { Schema, Model, model } from 'mongoose';
import { IProductInventory } from '../interfaces';

const productInventorySchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    necessaryMaterial: {
      material: { type: Schema.Types.ObjectId, ref: 'Material' },
      quantity: { type: Number },
      unitary: { type: Boolean },
    },
  },
  { timestamps: true }
);

const ProductInventory: Model<IProductInventory> =
  moongose.models.ProductInventory ||
  model('ProductInventory', productInventorySchema);

export default ProductInventory;
