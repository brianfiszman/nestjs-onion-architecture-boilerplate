import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrmModule, ormOptions } from '../database/orm';
import { AppController } from '../../application/controllers';
import { AuthorModule } from '../../domain/modules/author.module';
import { BookModule } from '../../domain/modules/book.module';
import { validate } from '../config/env.validation';

@Module({
  imports: [
    OrmModule.forRoot(ormOptions.host, ormOptions.options),
    ConfigModule.forRoot({
      validate,
    }),
    AuthorModule,
    BookModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
