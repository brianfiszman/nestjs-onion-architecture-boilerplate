import { Injectable } from '@nestjs/common';
import { AuthorCreateDTO } from '../../application/dtos/author';
import { AuthorRepository } from '../../infrastructure/repositories';
import { Author } from '../entities';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async findAll(): Promise<Author[]> {
    const results: Author[] = await this.authorRepository.findAll();
    return results;
  }

  async create(authorCreateDTO: AuthorCreateDTO): Promise<Author> {
    const newAuthor = this.authorRepository.persist(authorCreateDTO);
    return newAuthor;
  }
}
