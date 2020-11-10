import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';
import { Book } from '../../../domain/entities';

export class AuthorGetDTO {
  @IsUUID()
  id: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsOptional()
  termsAccepted: boolean | undefined;
  @IsNotEmpty()
  born: Date | undefined;
  @IsOptional()
  favouriteBook: Book | undefined;

  constructor(
    id: string,
    name: string,
    email: string,
    termsAccepted: boolean | undefined,
    born: Date | undefined,
    favouriteBook: Book | undefined
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.termsAccepted = termsAccepted;
    this.born = born;
    this.favouriteBook = favouriteBook;
  }
}
