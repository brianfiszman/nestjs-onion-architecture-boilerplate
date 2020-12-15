import { BookCreateDTO } from './../../application/dtos/book/book-create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../../domain/schemas';

@Injectable()
export class BookRepository {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>
  ) {}

  async findAll(): Promise<Book[]> {
    const results: Book[] = await this.bookModel.find();
    return results;
  }

  async create(bookCreateDTO: BookCreateDTO): Promise<Book> {
    const newBook = new this.bookModel(bookCreateDTO);
    return newBook.save();
  }
}
