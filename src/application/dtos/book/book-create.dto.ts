import { MaxLength } from 'class-validator';
import { Author } from '../../../domain/entities';

export class BookCreateDTO {
  @MaxLength(50)
  title: string;
  @MaxLength(100)
  author: Author;
}
