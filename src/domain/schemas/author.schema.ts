import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema()
export class Author extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  age?: number;

  @Prop()
  termsAccepted?: boolean;

  @Prop()
  born?: Date;

  constructor(name: string, email: string, age?: number, termsAccepted?: boolean, born?: Date | undefined) {
    super();
    this.name = name;
    this.email = email;
    this.age = age;
    this.termsAccepted = termsAccepted || false;
    this.born = born;
  }
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
