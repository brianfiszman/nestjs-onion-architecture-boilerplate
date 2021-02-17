import morgan from 'morgan';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';
import { getKafkaConfig } from './infrastructure/config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Http Server
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));

  const configService = app.get(ConfigService);
  const NODE_PORT = configService.get('NODE_PORT');

  await app.listen(NODE_PORT, () => Logger.log('HTTP Service is listening', 'App'));

  // Kafka Microservice
  const microservice = app.connectMicroservice(getKafkaConfig());

  app.startAllMicroservices();

  microservice.listen(() => Logger.log('kafka consumer service is listening', 'App'));
}
bootstrap();
