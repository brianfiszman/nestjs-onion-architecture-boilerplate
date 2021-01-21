import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaServiceName, KafkaTopics } from '../enums/kafka.enums';

@Injectable()
export class KafkaService {
  constructor(
    @Inject(KafkaServiceName)
    private kafkaClient: ClientKafka
  ) {}

  async connectProducer(topic: KafkaTopics): Promise<void> {
    this.kafkaClient.subscribeToResponseOf(topic);
    await this.kafkaClient.connect();
  }

  sendMessage(topic: KafkaTopics, message: string): void {
    this.kafkaClient.send(topic, message);
  }
}
