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
    const todos = await this.bookRepository.findAll();
    return todos;
  }

  async create(values: BookCreateDTO): Promise<Book> {
    const { title, author } = values;
    const book = new Book(title, author);
    await this.bookRepository.persist(book);
    return book;
  }
}
