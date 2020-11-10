import { Options } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { Author, Book, BookTag, Publisher, BaseEntity } from '../../domain/entities';

import * as dotenv from 'dotenv';
dotenv.config();

const { MONGO_HOST, MONGO_PORT, MONGO_USER, MONGO_PASS, MONGO_DB_NAME, MONGO_CLIENT_URL } = process.env;

const options: Options = {
  type: 'mongo',
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
  dbName: MONGO_DB_NAME,
  host: MONGO_HOST,
  user: MONGO_USER,
  password: MONGO_PASS,
  port: Number(MONGO_PORT),
  clientUrl: MONGO_CLIENT_URL,
  highlighter: new MongoHighlighter(),
  debug: true,
};

export default options;
