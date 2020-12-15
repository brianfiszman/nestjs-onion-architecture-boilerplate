import { IsUUID, IsNotEmpty } from 'class-validator';

export class BookGetDTO {
  @IsUUID()
  id: string;
  @IsNotEmpty()
  title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}
