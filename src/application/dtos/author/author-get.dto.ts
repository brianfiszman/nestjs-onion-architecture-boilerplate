/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';
import { Book } from '../../../domain/entities';

export class AuthorGetDTO {
  @IsUUID()
  _id: string;
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

  constructor({ _id, name, email, termsAccepted, born, favouriteBook }: any = {}) {
    this._id = _id;
    this.name = name;
    this.email = email;
    termsAccepted && (this.termsAccepted = termsAccepted);
    this.born = born;
    favouriteBook && (this.favouriteBook = favouriteBook);
  }
}
