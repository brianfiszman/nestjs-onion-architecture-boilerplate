import * as mongoose from 'mongoose';

export const RegionSchema = new mongoose.Schema(
  {
    scanned: Date,
    scans: { type: Number, default: 0 },
    tags: { type: Array, default: [] },
    inStores: { type: Array, default: [] },
  },
  {
    _id: false,
    id: false,
    timestamps: false,
  }
);
