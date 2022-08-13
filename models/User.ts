import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: Schema.Types.ObjectId, ref: 'Address' },
    role: {
      type: String,
      enum: {
        values: [
          'admin',
          'client',
          'federal',
          'frequent',
        ],
        message: '{VALUE} is not a valid role',
        default: 'client',
        required: true,
      },
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
