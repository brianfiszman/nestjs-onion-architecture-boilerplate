import { Module } from '@nestjs/common';
import { OrmModule, ormOptions } from '../database/orm';
import { AppController } from '../../application/controllers';
import { AuthorModule } from '../../domain/modules/author.module';
import { BookModule } from '../../domain/modules/book.module';

@Module({
  imports: [OrmModule.forRoot(ormOptions.host, ormOptions.options), AuthorModule, BookModule],
  controllers: [AppController],
})
export class AppModule {}
