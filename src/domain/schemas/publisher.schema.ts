import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PublisherDocument = Publisher & Document;

@Schema()
export class Publisher extends Document {
  @Prop()
  name: string;

  @Prop()
  type: PublisherType;

  constructor(name: string, type = PublisherType.LOCAL) {
    super();
    this.name = name;
    this.type = type;
  }
}

export enum PublisherType {
  LOCAL = 'local',
  GLOBAL = 'global',
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);
