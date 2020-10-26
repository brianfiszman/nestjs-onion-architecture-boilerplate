import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Book } from '../../entities';
import { BookCreateDTO } from '../../../application/dtos/book';
import { BookRepository } from '../../../infrastructure/repositories';

@Injectable()
export class BookService {
  constructor(private em: EntityManager, private bookRepository: BookRepository) {}

  async findAll(): Promise<Book[]> {
    const todos = await this.bookRepository.findAll();
    return todos;
  }

  async create(values: BookCreateDTO): Promise<Book> {
    const { title, author } = values;
    const book = new Book(title, author);
    await this.bookRepository.persist(book);
    await this.em.flush();
    return book;
  }
}
