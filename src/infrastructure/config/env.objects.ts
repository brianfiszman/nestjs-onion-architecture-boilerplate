import { expandEnvVariables } from '../../domain/helpers/';

expandEnvVariables();

export enum EnvObjects {
  MONGO_OPTIONS = 'MongoOptions',
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
});
