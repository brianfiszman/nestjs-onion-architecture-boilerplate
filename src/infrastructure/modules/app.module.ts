import { Module, DynamicModule, OnApplicationShutdown } from '@nestjs/common';
import { ORM, OrmModule, OrmModuleOptions } from '../database/orm';
import ormOptions from '../database/orm/orm.config';
import { AppController } from '../../application/controllers';
import { AuthorModule } from '../../domain/modules/author.module';
import { BookModule } from '../../domain/modules/book.module';

@Module({
  imports: [OrmModule.forRoot(ormOptions), AuthorModule, BookModule],
  controllers: [AppController],
})
export class AppModule implements OnApplicationShutdown {
  constructor(private orm: ORM) {}

  static register(options?: { ormOptions?: OrmModuleOptions }): DynamicModule {
    return {
      module: AppModule,
      imports: [OrmModule.forRoot(ormOptions)],
    };
  }

  async onApplicationShutdown(signal?: string | undefined): Promise<void> {
    await this.orm.close();
  }
}
