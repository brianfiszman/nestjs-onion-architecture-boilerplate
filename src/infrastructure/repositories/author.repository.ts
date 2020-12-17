import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDocument } from '../../domain/entities';
import { AuthorCreateDTO } from '../../application/dtos/author/author-create.dto';
import { Entities } from '../../domain/entities/entities.enum';

@Injectable()
export class AuthorRepository {
  constructor(@InjectModel(Entities.Author) private readonly authorModel: Model<AuthorDocument>) {}

  async findAll(): Promise<Author[]> {
    const results: Author[] = await this.authorModel.find().exec();
    return results;
  }

  async persist(authorCreateDTO: AuthorCreateDTO): Promise<Author> {
    const newAuthor = new this.authorModel(authorCreateDTO);
    return newAuthor.save();
  }
}
