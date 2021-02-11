import { random, date } from 'faker';
import { KafkaPayload, KafkaMessageValue } from '../../src/domain/interfaces';
import { KafkaProducers, KafkaTopics } from '../../src/domain/enums';

export const getFakeMessageValue = (message: any): KafkaMessageValue => ({
  producer: KafkaProducers.ALKEMICS,
  message,
});

export const getFakeKafkaPayload = (message: any): Partial<KafkaPayload> => ({
  timestamp: date.recent().toISOString(),
  topic: KafkaTopics.ACTIONS,
  partition: random.number(10),
  key: random.word(),
  value: getFakeMessageValue(message),
});
