import { Module } from '@nestjs/common';
import { BookController } from '../../application/controllers';
import { BookService } from '../services/book.service';
import { OrmModule } from '../../infrastructure/database/orm';
import { BookSchema } from '../entities/book.schema';
import { BookRepository } from '../../infrastructure/repositories';
import { Entities } from '../entities/entities.enum';

@Module({
  imports: [OrmModule.forFeature([{ name: Entities.Book, schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
