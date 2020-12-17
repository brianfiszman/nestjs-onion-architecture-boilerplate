import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthorService } from '../../domain/services/author.service';
import { AuthorCreateDTO, AuthorGetDTO } from '../dtos/author';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  async findAll(): Promise<AuthorGetDTO[]> {
    const authors = await this.authorService.findAll();
    const dtos: AuthorGetDTO[] = authors.map(author => new AuthorGetDTO(author));

    return dtos;
  }

  @Post()
  async create(@Body() authorCreateDTO: AuthorCreateDTO): Promise<AuthorGetDTO> {
    const dto = new AuthorCreateDTO(authorCreateDTO);
    const author = await this.authorService.create(dto);
    return new AuthorGetDTO(author);
  }
}
