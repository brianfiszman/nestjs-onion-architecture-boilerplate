import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Book, BookSchema } from './book.schema';

export interface Author {
  _id: string;
  name: string;
  email: string;
  termsAccepted?: boolean;
  born?: Date;
  books?: Array<Book>;
  favouriteBook?: Book;
}

export type AuthorDocument = Author & Document;

export const AuthorSchema: any = new mongoose.Schema(
  {
    name: String,
    email: String,
    age: String,
    termsAccepted: Boolean,
    born: Date,
    books: {
      type: [BookSchema],
      default: [],
    },
    favouriteBook: {
      type: BookSchema,
      default: null,
    },
  },
  {
    timestamps: true,
    _id: true,
    useNestedStrict: true,
  }
);
