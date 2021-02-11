import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MessageSendDto } from '../../application/dtos';
import { KafkaServiceName, KafkaTopics, SRServiceName } from '../enums';
import { SchemaRegistryService } from './schemaRegistry.service';

@Injectable()
export class KafkaService {
  constructor(
    @Inject(KafkaServiceName) private kafkaClient: ClientKafka,
    @Inject(SRServiceName) private readonly registry: SchemaRegistryService
  ) {}

  async connectProducer(topic: KafkaTopics[]): Promise<void> {
    topic.map(name => {
      this.kafkaClient.subscribeToResponseOf(name);
    });
    await this.kafkaClient.connect();
  }

  async sendMessage(topic: KafkaTopics, message: MessageSendDto): Promise<void> {
    const schemaId = this.registry.getSchemaIdByTopic(topic);
    const data = await this.registry.encodePayload(schemaId, message);

    data && this.kafkaClient.send(topic, data);
  }
}
