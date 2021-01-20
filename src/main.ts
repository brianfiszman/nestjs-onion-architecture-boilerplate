import morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './infrastructure/modules/app.module';

async function bootstrap() {
  // Producer kafka messages App
  /* const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(morgan('dev'));

  const NODE_PORT = configService.get('NODE_PORT');
  await app.listen(NODE_PORT); */

  // Consumer kafka messages App
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:19092'],
      },
      consumer: {
        groupId: 'my-kafka-consumer',
      },
    },
  });
  app.listen(() => console.log('Kafka consumer service is listening!'));
}
bootstrap();
