import { BookCreateDTO } from './../../application/dtos/book/book-create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../../domain/entities';
import { Entities } from '../../domain/enums/entities.enum';

@Injectable()
export class BookRepository {
  constructor(@InjectModel(Entities.Book) private readonly bookModel: Model<BookDocument>) {}

  async findAll(): Promise<Book[]> {
    const results: Book[] = await this.bookModel.find().exec();
    return results;
  }

  async persist(bookCreateDTO: BookCreateDTO): Promise<Book> {
    const newBook = new this.bookModel(bookCreateDTO);
    return newBook.save();
  }
}
