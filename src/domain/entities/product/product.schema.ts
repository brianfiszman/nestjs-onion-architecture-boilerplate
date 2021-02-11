import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Product } from '../../interfaces';
import { Timestamps } from '../../enums/entities.enum';
import { SourceSchema } from './source.schema';
import { RegionSchema } from './region.schema';

export type ProductDocument = Product & Document;

export const ProductSchema = new mongoose.Schema(
  {
    ean: String,
    status: String,
    defaultLc: String,
    region: {
      type: mongoose.Schema.Types.Map,
      of: {
        type: RegionSchema,
        default: {},
      },
      default: {
        FR: {},
      },
    },
    score: String,
    source: [SourceSchema],
    _schema: String,
  },
  {
    versionKey: false,
    timestamps: { createdAt: false, updatedAt: Timestamps.UpdatedAt },
  }
);
