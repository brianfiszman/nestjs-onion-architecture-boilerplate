/* eslint-disable @typescript-eslint/no-explicit-any */
import { MaxLength } from 'class-validator';

export class AuthorCreateDTO {
  @MaxLength(50)
  name: string;
  @MaxLength(100)
  email: string;

  constructor({ name, email }: any = {}) {
    this.name = name;
    this.email = email;
  }
}
