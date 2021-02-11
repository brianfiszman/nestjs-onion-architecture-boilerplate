import * as mongoose from 'mongoose';
import { Locales, Regions, Sources, Status } from '../../enums';
import { uuid } from 'uuidv4';
import { ProductSourceSchema } from './productSource.schema';
import { Timestamps } from '../../enums/entities.enum';

export const SourceSchema = new mongoose.Schema(
  {
    name: String,
    id: { type: String, default: () => uuid() },
    src: { type: String, enum: Object.values(Sources), required: true, default: Sources.ALKEMICS },
    lc: { type: String, enum: Object.values(Locales), required: true, default: Locales.FR },
    region: { type: String, enum: Object.values(Regions), required: true, default: Regions.FR },
    product: ProductSourceSchema,
    status: { type: String, enum: Object.values(Status) },
  },
  {
    timestamps: { createdAt: Timestamps.CreatedAt, updatedAt: Timestamps.UpdatedAt },
    _id: false,
  }
);
