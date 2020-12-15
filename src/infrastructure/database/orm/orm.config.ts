import { Product } from '../../../domain/schemas';
import * as dotenv from 'dotenv';

dotenv.config();

const { MONGO_HOST, MONGO_PORT, MONGO_USER, MONGO_PASS, MONGO_DB_NAME, MONGO_AUTH_DB } = process.env;

const mongoOptions = {
  type: 'mongo',
  entities: [Product],
  name: 'mongoConnection',
  dbName: MONGO_DB_NAME,
  host: MONGO_HOST,
  user: MONGO_USER,
  password: MONGO_PASS,
  port: Number(MONGO_PORT),
  debug: true,
  clientUrl: `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=${MONGO_AUTH_DB}`,
};
  debug: true,
};

export { mongoOptions };
