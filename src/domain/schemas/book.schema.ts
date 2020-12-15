import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book extends Document {
  @Prop()
  title: string;

  constructor(title: string) {
    super();
    this.title = title;
  }
}

export const BookSchema = SchemaFactory.createForClass(Book);
