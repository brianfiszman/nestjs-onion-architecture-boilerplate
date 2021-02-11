import { MaxLength, MinLength, IsEAN, ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { Region, Source } from '../../../domain/interfaces';

export class ProductGetDto {
  @MaxLength(20)
  @MinLength(5)
  @IsEAN()
  ean: string;
  status: string;
  defaultLc: string;
  @IsNotEmpty({
    each: true,
  })
  region: Record<string, Region>;
  score: number;
  @ArrayNotEmpty()
  source: Source[];
  _schema: number;
  updated: Date;

  constructor({ ean, status, defaultLc, region, score, source, _schema, updated }: any = {}) {
    this.ean = ean;
    this.status = status;
    this.defaultLc = defaultLc;
    this.region = region;
    this.score = score;
    this.source = source;
    this._schema = _schema;
    this.updated = updated;
  }
}
