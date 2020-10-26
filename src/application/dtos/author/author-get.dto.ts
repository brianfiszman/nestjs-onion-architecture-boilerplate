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
  termsAccepted: boolean | null;
  @IsNotEmpty()
  born: Date | undefined;
  @IsOptional()
  favouriteBook: Book | undefined;
}
