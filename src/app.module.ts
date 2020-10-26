import mikroOrmOptions from './mikro-orm.config';
import { Module, DynamicModule, OnApplicationShutdown } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Author, Book } from './domain/entities';
import { AuthorService } from './domain/services/author';
import { BookService } from './domain/services/book';
import { AppController, AuthorController, BookController } from './application/controllers';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Author, Book],
    }),
  ],
  providers: [AuthorService, BookService],
  controllers: [AppController, AuthorController, BookController],
})
export class AppModule implements OnApplicationShutdown {
  constructor(private orm: MikroORM) {}

  static register(options?: { mikroOrmOptions?: MikroOrmModuleOptions }): DynamicModule {
    return {
      module: AppModule,
      imports: [MikroOrmModule.forRoot(mikroOrmOptions)],
    };
  }

  async onApplicationShutdown(signal?: string | undefined): Promise<void> {
    await this.orm.close();
  }
}
