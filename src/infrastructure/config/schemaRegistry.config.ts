import { SchemaRegistryAPIClientArgs } from '@kafkajs/confluent-schema-registry/dist/api';

export const getSchemaRegistryOptions = (): SchemaRegistryAPIClientArgs => ({
  host: process.env.SCHEMA_REGISTRY_CLIENT as string,
  retry: {
    maxRetryTimeInSecs: 5,
    retries: 3,
  },
});
