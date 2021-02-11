import * as mongoose from 'mongoose';
import { AllergensList, AllergensValues, Locales } from '../../enums';

export const AllergenSchema = new mongoose.Schema(
  {
    name: { type: String, enum: Object.values(AllergensList) },
    value: { type: String, enum: Object.values(AllergensValues) },
    lc: { type: String, enum: Object.values(Locales), default: Locales.EN },
  },
  {
    _id: false,
    id: false,
    timestamps: false,
  }
);
