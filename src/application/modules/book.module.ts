import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BookController } from '../controllers';
import { BookService } from '../../domain/services/book.service';
import { Book } from '../../domain/entities/book.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
