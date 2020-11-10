import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthorService } from '../../domain/services/author.service';
import { AuthorCreateDTO, AuthorGetDTO } from '../dtos/author';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  async findAll(): Promise<AuthorGetDTO[]> {
    const authors = await this.authorService.findAll();
    const dtos = authors.map(author => {
      const { id, name, email, termsAccepted, born, favouriteBook } = author;

      return {
        id,
        name,
        email,
        termsAccepted,
        born,
        favouriteBook,
      };
    });

    return dtos;
  }

  @Post()
  async create(@Body() values: AuthorCreateDTO): Promise<AuthorGetDTO> {
    const author = await this.authorService.create(values);
    const { id, name, email, termsAccepted, born, favouriteBook } = author;
    const dto: AuthorGetDTO = {
      id,
      name,
      email,
      termsAccepted,
      born,
      favouriteBook,
    };

    return dto;
  }
}
