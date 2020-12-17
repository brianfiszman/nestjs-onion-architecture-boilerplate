import { Injectable } from '@nestjs/common';
import { BookCreateDTO } from '../../application/dtos/book';
import { BookRepository } from '../../infrastructure/repositories';
import { Book } from '../entities';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async findAll(): Promise<Book[]> {
    const results: Book[] = await this.bookRepository.findAll();
    return results;
  }

  async create(bookCreateDTO: BookCreateDTO): Promise<Book> {
    const newBook = this.bookRepository.persist(bookCreateDTO);
    return newBook;
  }
}
