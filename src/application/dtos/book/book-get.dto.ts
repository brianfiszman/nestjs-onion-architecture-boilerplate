import { IsUUID, IsNotEmpty } from 'class-validator';
import { Author } from '../../../domain/entities';

export class BookGetDTO {
  @IsUUID()
  id: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  author: Author;

  constructor(id: string, title: string, author: Author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}
