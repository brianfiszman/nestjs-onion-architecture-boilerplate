import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register());
  app.use(morgan('dev'));
  await app.listen(5000);
}
bootstrap();
