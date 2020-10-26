import { MaxLength } from 'class-validator';

export class AuthorCreateDTO {
  @MaxLength(50)
  name: string;
  @MaxLength(100)
  email: string;
}
