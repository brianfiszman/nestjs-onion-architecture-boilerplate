import * as mongoose from 'mongoose';

export const LifeCycleSchema = new mongoose.Schema(
  {
    status: String,
    firstAvailabilityDate: Date,
  },
  {
    _id: false,
    id: false,
    timestamps: false,
  }
);
