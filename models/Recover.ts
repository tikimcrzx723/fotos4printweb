import mongoose, { Schema, model, Model } from 'mongoose';
import { IRecover } from '../interfaces';

const recoverSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    numberOfAttempts: { type: Number },
    tempPassword: { type: String, required: true },
    requestedDay: { type: Date, required: true },
    changePassword: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Recover: Model<IRecover> =
  mongoose.models.Recover || model('Recover', recoverSchema);

export default Recover;
