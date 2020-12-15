import { IsNotEmpty, MaxLength, ValidateNested } from 'class-validator';

export class BookCreateDTO {
  @IsNotEmpty()
  @MaxLength(50)
  title: string;
}
