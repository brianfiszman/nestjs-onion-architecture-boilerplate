import { Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
  {
    value: mongoose.Schema.Types.Mixed,
    categoryId: String,
  },
  {
    timestamps: false,
    _id: false,
    id: false,
  }
);
