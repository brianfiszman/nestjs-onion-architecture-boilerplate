import { BookRepository } from './../../infrastructure/repositories';
import { Injectable } from '@nestjs/common';
import { BookCreateDTO } from '../../application/dtos/book';
import { Book } from '../schemas';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async findAll(): Promise<Book[]> {
    const results: Book[] = await this.bookRepository.findAll();
    return results;
  }

  async create(bookCreateDTO: BookCreateDTO): Promise<Book> {
    const newBook = this.bookRepository.create(bookCreateDTO);
    return newBook;
  }
}
