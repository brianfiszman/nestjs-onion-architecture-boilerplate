import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { KafkaServiceName } from '../../domain/enums/';
import { KafkaService } from '../../domain/services/';
import { getKafkaConfig } from '../config';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: KafkaServiceName,
        ...getKafkaConfig(),
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
