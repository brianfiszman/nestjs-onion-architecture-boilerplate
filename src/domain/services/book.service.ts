import { EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Book } from '../entities';
import { BookCreateDTO } from '../../application/dtos/book';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: EntityRepository<Book>
  ) {}

  async findAll(): Promise<Book[]> {
    const results: Book[] = await this.bookRepository.findAll();
    return results;
  }

  async create(values: BookCreateDTO): Promise<Book> {
    const { title, author } = values;
    const book: Book = new Book(title, author);
    await this.bookRepository.persist(book);
    return book;
  }
}
