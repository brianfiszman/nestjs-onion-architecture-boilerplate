import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator';
import { Book } from '../../../domain/schemas';

export class AuthorGetDTO {
  @IsUUID()
  id: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsOptional()
  age: number | undefined;
  @IsOptional()
  termsAccepted: boolean | undefined;
  @IsNotEmpty()
  born: Date | undefined;

  constructor(
    id: string,
    name: string,
    email: string,
    age: number | undefined,
    termsAccepted: boolean | undefined,
    born: Date | undefined
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.termsAccepted = termsAccepted;
    this.born = born;
  }
}
