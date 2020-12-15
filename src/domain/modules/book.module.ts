import { BookRepository } from './../../infrastructure/repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookController } from '../../application/controllers';
import { BookService } from '../services/book.service';
import { Book, BookSchema } from '../schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
