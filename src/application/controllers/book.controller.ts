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
    const dtos: BookGetDTO[] = books.map(book => new BookGetDTO(book));

    return dtos;
  }

  @Post()
  async create(@Body() bookCreateDTO: BookCreateDTO): Promise<BookGetDTO> {
    const dto = new BookCreateDTO(bookCreateDTO);
    const book = await this.bookService.create(dto);
    return new BookGetDTO(book);
  }
}
