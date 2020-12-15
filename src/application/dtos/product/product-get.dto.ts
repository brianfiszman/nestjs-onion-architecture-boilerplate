import { IsUUID, IsNotEmpty } from 'class-validator';

export class ProductGetDTO {
  @IsUUID()
  id: string;
  @IsNotEmpty()
  ean: string;

  constructor(id: string, ean: string) {
    this.id = id;
    this.ean = ean;
  }
}
