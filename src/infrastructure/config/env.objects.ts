import { expandEnvVariables } from '../../domain/helpers/';

expandEnvVariables();

export enum EnvObjects {
  MONGO_OPTIONS = 'MongoOptions',
  KAFKA_CLIENT = 'KafkaClientOptions',
  SCHEMAS_ID = 'SchemaRegistryId',
}

export interface MongoOptions {
  host: string;
  options: {
    dbName: string;
    auth: {
      user: string;
      password: string;
    };
  };
}

export interface SchemaRegistryIds {
  actions: number;
  products: number;
  jobdata: number;
  errors: number;
}

export const configuration = (): any => ({
  MongoOptions: {
    host: process.env.MONGO_CLIENT_URL,
    options: {
      dbName: process.env.MONGO_DB_NAME,
      auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASS,
      },
    },
  },
  SchemaRegistryId: {
    actions: parseInt(process.env.ACTIONS_SCHEMA as string),
    products: parseInt(process.env.PRODUCTS_SCHEMA as string),
    jobdata: parseInt(process.env.JOBDATA_SCHEMA as string),
    errors: parseInt(process.env.ERRORS_SCHEMA as string),
  },
});
