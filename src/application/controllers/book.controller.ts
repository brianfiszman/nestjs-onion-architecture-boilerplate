import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookService } from '../../domain/services/book.service';
import { BookCreateDTO } from '../dtos/book';
import { BookGetDTO } from '../dtos/book/book-get.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async findAll(): Promise<BookGetDTO[]> {
    const books = await this.bookService.findAll();
    const dtos: BookGetDTO[] = books.map(book => {
      const { id, title } = book;

      return new BookGetDTO(id, title);
    });

    return dtos;
  }

  @Post()
  async create(@Body() values: BookCreateDTO): Promise<BookGetDTO> {
    const book = await this.bookService.create(values);
    const { id, title } = book;
    const dto: BookGetDTO = new BookGetDTO(id, title);

    return dto;
  }
}
