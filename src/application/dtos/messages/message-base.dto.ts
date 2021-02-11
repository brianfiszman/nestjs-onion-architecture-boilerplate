import { IsOptional } from 'class-validator';
import { KafkaPayload } from '../../../domain/interfaces';
import { KafkaProducers } from '../../../domain/enums';

export abstract class MessageSendDto {
  producer: KafkaProducers;
  message: any;
  constructor(producer: KafkaProducers) {
    this.producer = producer;
  }
}

export class MessageGetDTO {
  timestamp: Date;
  topic: string;
  partition: number;
  producer: string;
  @IsOptional()
  key: string;
  data: any;

  constructor({ timestamp, topic, partition, key, value }: KafkaPayload) {
    this.timestamp = new Date(timestamp);
    this.topic = topic;
    this.partition = partition;
    this.key = key;
    this.producer = value.producer;
    this.data = value.message;
  }
}
