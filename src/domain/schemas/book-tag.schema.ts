import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookTagDocument = BookTag & Document;

@Schema()
export class BookTag extends Document {
  @Prop()
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export const BookTagSchema = SchemaFactory.createForClass(BookTag);
