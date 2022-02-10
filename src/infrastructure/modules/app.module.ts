import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, EnvObjects, MongoOptions } from '../config/env.objects';
import { OrmModule } from '../database/orm';
import { MovieModule } from '../../domain/modules/movie.module';
import { validate } from '../config/env.validation';

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
    MovieModule,
  ],
  controllers: [],
})
export class AppModule {}
