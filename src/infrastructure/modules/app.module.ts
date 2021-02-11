import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, EnvObjects, MongoOptions } from '../config/env.objects';
import { OrmModule } from '../database/orm';
import { AppController } from '../../application/controllers';
import { AuthorModule } from '../../domain/modules/author.module';
import { BookModule } from '../../domain/modules/book.module';
import { validate } from '../config/env.validation';
import { ProductsModule } from '../../domain/modules';
import { KafkaModule } from './kafka.module';
import { SchemaRegistryModule } from './schemaRegistry.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    OrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const data = configService.get<MongoOptions>(EnvObjects.MONGO_OPTIONS);
        return { uri: data?.host, ...data?.options };
      },
      inject: [ConfigService],
    }),
    AuthorModule,
    BookModule,
    ProductsModule,
    KafkaModule,
    SchemaRegistryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
