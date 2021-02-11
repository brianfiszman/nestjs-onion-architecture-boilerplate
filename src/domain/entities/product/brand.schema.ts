import * as mongoose from 'mongoose';
import { uuid } from 'uuidv4';

export const BrandSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => uuid(),
    },
    value: String,
    otherNames: { type: Array, default: [] },
    image: { type: String, default: null },
    imageBanner: { type: String, default: null },
  },
  {
    _id: false,
    timestamps: false,
  }
);
