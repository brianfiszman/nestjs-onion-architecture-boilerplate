import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface Book {
  _id: string;
  title: string;
  author: string;
}

export type BookDocument = Book & Document;

export const BookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
  },
  {
    timestamps: true,
    _id: true,
    useNestedStrict: true,
  }
);
