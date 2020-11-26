import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';
import morgan from 'morgan';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register());
  app.use(morgan('dev'));
  await app.listen(5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
