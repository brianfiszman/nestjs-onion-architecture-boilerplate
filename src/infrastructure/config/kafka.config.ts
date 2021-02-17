import { KafkaOptions, Transport } from '@nestjs/microservices';

const kafkaClient = {
  options: {
    client: {
      clientId: process.env.KAFKA_CLIENT,
      brokers: [process.env.KAFKA_HOST as string],
    },
    consumer: {
      groupId: process.env.KAFKA_GROUP as string,
    },
  },
};

export const getKafkaConfig = (): KafkaOptions => ({
  transport: Transport.KAFKA,
  ...kafkaClient,
});
