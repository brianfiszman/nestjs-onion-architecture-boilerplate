import { IsNotEmpty, MaxLength, MinLength, IsEAN, ArrayNotEmpty } from 'class-validator';
import { Regions } from '../../../domain/enums';
import { Region } from '../../../domain/interfaces';

export class ProductCreateDTO {
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(5)
  @IsEAN()
  ean: string;
  @IsNotEmpty({
    each: true,
  })
  region: Record<Regions, Region>;
  @ArrayNotEmpty()
  source: [];

  constructor({ ean, region, source }: any = {}) {
    this.ean = ean;
    this.region = region;
    this.source = source;
  }
}
