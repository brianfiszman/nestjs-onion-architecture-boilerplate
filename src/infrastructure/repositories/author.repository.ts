import { AuthorCreateDTO } from './../../application/dtos/author/author-create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from '../../domain/schemas';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectModel(Author.name)
    private readonly authorModel: Model<Author>
  ) {}

  async findAll(): Promise<Author[]> {
    const results: Author[] = await this.authorModel.find();
    return results;
  }

  async create(authorCreateDTO: AuthorCreateDTO): Promise<Author> {
    const newAuthor = new this.authorModel(authorCreateDTO);
    return newAuthor.save();
  }
}
