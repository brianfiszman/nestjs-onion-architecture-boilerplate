import { Module, DynamicModule, OnApplicationShutdown } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { AppController } from '../controllers';
import { AuthorModule } from '../modules/author.module';
import { BookModule } from '../modules/book.module';
import mikroOrmOptions from '../../mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmOptions), AuthorModule, BookModule],
  controllers: [AppController],
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
