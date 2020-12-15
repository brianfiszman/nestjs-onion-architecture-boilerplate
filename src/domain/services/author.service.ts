import { AuthorRepository } from './../../infrastructure/repositories/author.repository';
import { Injectable } from '@nestjs/common';
import { AuthorCreateDTO } from '../../application/dtos/author';
import { Author } from '../schemas';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async findAll(): Promise<Author[]> {
    const results: Author[] = await this.authorRepository.findAll();
    return results;
  }

  async create(authorCreateDTO: AuthorCreateDTO): Promise<Author> {
    const newAuthor = this.authorRepository.create(authorCreateDTO);
    return newAuthor;
  }
}
