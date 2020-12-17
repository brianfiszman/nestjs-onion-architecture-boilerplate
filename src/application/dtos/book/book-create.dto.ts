/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsNotEmpty, MaxLength, ValidateNested } from 'class-validator';
import { Author } from '../../../domain/entities';

export class BookCreateDTO {
  @IsNotEmpty()
  @MaxLength(50)
  title: string;
  @IsNotEmpty()
  @ValidateNested()
  author: Author;

  constructor({ title, author }: any = {}) {
    this.title = title;
    this.author = author;
  }
}
