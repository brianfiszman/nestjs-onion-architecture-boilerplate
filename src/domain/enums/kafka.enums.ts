export enum KafkaTopics {
  ACTIONS = 'actions',
  PRODUCTS = 'products',
  JOBDATA = 'jobdata',
  ERRORS = 'errors',
}

export enum KafkaSignals {
  START = 'start',
}

export const KafkaServiceName = 'KAFKA_CLIENT';

export enum KafkaProducers {
  ALKEMICS = 'MS_ALKEMICS',
  SCHEDULER = 'MS_SCHEDULER',
}
