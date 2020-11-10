import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AuthorCreateDTO } from '../../application/dtos/author';
import { Author } from '../entities';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: EntityRepository<Author>
  ) {}

  async findAll(): Promise<Author[]> {
    const todos = await this.authorRepository.findAll();
    return todos;
  }

  async create(values: AuthorCreateDTO): Promise<Author> {
    const { name, email } = values;
    const author = new Author(name, email);
    await this.authorRepository.persist(author);
    return author;
  }
}