import * as dotenv from 'dotenv';
dotenv.config();

const { MONGO_HOST, MONGO_PORT, MONGO_USER, MONGO_PASS, MONGO_DB_NAME, MONGO_CLIENT_URL, MONGO_AUTH_DB } = process.env;

const options: any = {
  host:
    MONGO_CLIENT_URL ||
    `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=${MONGO_AUTH_DB}`,
  Options: {
    dbName: MONGO_DB_NAME,
    auth: {
      user: MONGO_USER,
      password: MONGO_PASS,
    },
  },
};

export default options;
