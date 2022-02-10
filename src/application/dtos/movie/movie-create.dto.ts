/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsDefined, IsOptional, IsUrl, MaxLength } from 'class-validator';
import { Categories } from '../../../domain/enums';

export class MovieCreateDTO {
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
  categories: Set<Categories> | Categories[];
  @IsOptional()
  publishDate?: Date;

  constructor({ title, url, description, categories = [], publishDate }: any = {}) {
    this.title = title;
    this.url = url;
    this.description = description;
    this.categories = categories;
    this.publishDate = publishDate;
  }
}
