import mongoose, { Schema, Model, model } from 'mongoose';
import { IUserCuponCode } from '../interfaces';

const userCuponCodeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    cupon: { type: Schema.Types.ObjectId, ref: 'CuponCode' },
  },
  { timestamps: true }
);

const UserCuponCode: Model<IUserCuponCode> =
  mongoose.models.UserCuponCode || model('UserCuponCode', userCuponCodeSchema);

export default UserCuponCode;
