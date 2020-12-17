/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';
import { Book } from '../../../domain/entities';

export class BookGetDTO {
  @IsUUID()
  _id: string;
  @IsNotEmpty()
  title: string;
  @IsOptional()
  author: string;

  constructor({ _id, title, author }: Book) {
    this._id = _id;
    this.title = title;
    this.author = author;
  }
}
