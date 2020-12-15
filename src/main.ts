import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';
import morgan from 'morgan';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  await app.listen(5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
