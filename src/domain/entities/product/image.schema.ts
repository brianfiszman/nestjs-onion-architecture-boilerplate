import * as mongoose from 'mongoose';
import { uuid } from 'uuidv4';
import { ImageTypes } from '../../enums';
import { Timestamps } from '../../enums/entities.enum';

export const ImageSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => uuid(),
    },
    title: String,
    quality: { type: Number, min: 1, max: 10, default: undefined },
    type: {
      type: String,
      lowercase: true,
      enum: Object.values(ImageTypes),
    },
    value: String,
    comment: String,
    height: Number,
    width: Number,
  },
  {
    _id: false,
    timestamps: { createdAt: Timestamps.CreatedAt, updatedAt: Timestamps.UpdatedAt },
  }
);
