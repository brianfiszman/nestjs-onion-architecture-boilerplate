import * as mongoose from 'mongoose';
import { Hints, Nutriscore } from '../../enums';

export const NutritionalSchema = new mongoose.Schema(
  {
    nutriscore: { type: String, enum: Object.values(Nutriscore), default: '' },
    nutriscorePoints: { type: Number, min: -50, max: 50, default: null },
    nutriscoreReported: {
      type: String,
      enum: Object.values(Nutriscore),
      default: null,
    },
    hint: {
      type: String,
      enum: Object.values(Hints),
      lowercase: true,
      default: null,
    },
    caloriesKj: { type: Number, min: 0, default: null },
    caloriesKcal: { type: Number, min: 0, default: null },
    fat: { type: Number, min: 0, default: null },
    saturatedFat: { type: Number, min: 0, default: null },
    glucids: { type: Number, min: 0, default: null },
    sugar: { type: Number, min: 0, default: null },
    fiber: { type: Number, min: 0, default: null },
    proteins: { type: Number, min: 0, default: null },
    salt: { type: Number, min: 0, default: null },
  },
  {
    _id: false,
    id: false,
    timestamps: false,
  }
);
