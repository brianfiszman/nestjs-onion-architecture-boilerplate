import { KafkaOptions, Transport } from '@nestjs/microservices';

const kafkaClient = {
  options: {
    client: {
      clientId: process.env.KAFKA_CLIENT,
      brokers: [process.env.KAFKA_HOST as string],
    },
  },
};

export const getKafkaConfig = (): KafkaOptions => ({
  transport: Transport.KAFKA,
  ...kafkaClient,
});

export const getKafkaConsumerConfig = ({ groupId }: any = {}): KafkaOptions => {
  const config: any = {
    options: {
      ...kafkaClient.options,
    },
  };
  groupId &&
    (config.options = {
      ...config.options,
      consumer: {
        groupId: process.env.KAFKA_GROUP as string,
      },
    });

  return {
    transport: Transport.KAFKA,
    ...config,
  };
};
