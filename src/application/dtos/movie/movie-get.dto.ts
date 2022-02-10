/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsUUID, IsOptional, IsDefined, MaxLength, IsUrl, IsDate } from 'class-validator';
import { Categories } from '../../../domain/enums';

export class MovieGetDTO {
  @IsUUID()
  _id: string;
  @IsDefined()
  @MaxLength(50)
  title: string;
  @IsUrl()
  @IsDefined()
  @MaxLength(100)
  url: string;
  @IsOptional()
  @MaxLength(100)
  description?: string;
  @IsDefined()
  categories: Set<Categories>;
  @IsDate()
  @IsOptional()
  publishDate?: Date;

  constructor({ title, url, description, categories }: any = {}) {
    this.title = title;
    this.url = url;
    this.description = description;
    this.categories = categories;
  }
}
