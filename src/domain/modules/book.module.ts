import { Module } from '@nestjs/common';
import { BookController } from '../../application/controllers';
import { BookService } from '../services/book.service';
import { Book } from '../entities/book.entity';
import { OrmModule } from '../../infrastructure/database/orm';

@Module({
  imports: [OrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
