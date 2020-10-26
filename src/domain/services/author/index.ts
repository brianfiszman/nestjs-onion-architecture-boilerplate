import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { AuthorCreateDTO } from '../../../application/dtos/author';
import { AuthorRepository } from '../../../infrastructure/repositories';
import { Author } from '../../entities';

@Injectable()
export class AuthorService {
  constructor(private em: EntityManager, private authorRepository: AuthorRepository) {}

  async findAll(): Promise<Author[]> {
    const todos = await this.authorRepository.findAll();
    return todos;
  }

  async create(values: AuthorCreateDTO): Promise<Author> {
    const { name, email } = values;
    const author = new Author(name, email);
    await this.authorRepository.persist(author);
    await this.em.flush();
    return author;
  }
}
