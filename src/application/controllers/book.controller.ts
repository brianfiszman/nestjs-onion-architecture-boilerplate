import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from '../../domain/services/book';
import { BookCreateDTO } from '../dtos/book';
import { BookGetDTO } from '../dtos/book/book-get.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async findAll(): Promise<BookGetDTO[]> {
    const books = await this.bookService.findAll();
    const dtos = books.map(book => {
      const { id, title, author } = book;

      return {
        id,
        title,
        author,
      };
    });

    return dtos;
  }

  @Post()
  async create(@Body() values: BookCreateDTO): Promise<BookGetDTO> {
    const book = await this.bookService.create(values);
    const { id, title, author } = book;
    const dto: BookGetDTO = {
      id,
      title,
      author,
    };

    return dto;
  }
}