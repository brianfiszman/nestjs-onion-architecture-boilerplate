import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Categories } from '../enums';

export interface Movie {
  _id?: string;
  title: string;
  url: string;
  description?: string;
  categories: Categories[] | Set<Categories>;
  publishDate?: Date;
}

export type MovieDocument = Movie & Document;

export const MovieSchema: any = new mongoose.Schema(
  {
    title: String,
    url: String,
    description: String,
    categories: {
      type: [String],
      enum: Categories,
    },
    publishDate: Date,
  },
  {
    timestamps: true,
    _id: true,
  }
);

MovieSchema.index({ title: 1 }, { unique: true });
