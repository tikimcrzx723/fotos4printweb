import mongoose, { Schema, Model, model } from 'mongoose';

const deliverySchema = new Schema(
  {
    price: { type: Number, required: true },
    minFree: { type: Number, required: true },
    location: {
      companyName: { type: String, required: true },
      address: { type: String, required: true },
      address2: { type: String },
      zip: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      phone: { type: String, required: true },
    },
  },
  { timestamps: true }
);
