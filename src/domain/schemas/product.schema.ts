import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ collection: 'products'})
export class Product {
  @Prop()
  id!: string;

  @Prop()
  ean: string;

  @Prop()
  metaArrayOfStrings?: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);