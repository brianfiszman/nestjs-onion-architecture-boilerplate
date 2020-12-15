import { IsNotEmpty, MaxLength } from 'class-validator';

export class ProductCreateDTO {
  @IsNotEmpty()
  @MaxLength(50)
  ean: string;
}
