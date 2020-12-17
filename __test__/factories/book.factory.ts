import { random, lorem, name } from 'faker';
import { v4 as uuid } from 'uuid';
import { ObjectId } from 'mongodb';
import { BookCreateDTO } from '../../src/application/dtos/book';
import { BookGetDTO } from '../../src/application/dtos/book/book-get.dto';
import { fakeAuthorDTO } from './author.factory';

const objectId = new ObjectId().toHexString();
const MaxLengthTitle = 50;

export const fakeBookCreate: BookCreateDTO = {
  title: random.words(4),
  author: fakeAuthorDTO,
};

export const fakeBook: BookGetDTO = {
  _id: uuid(),
  title: random.words(4),
  author: objectId,
};

export const fakeBookMaxLength = {
  title: lorem.word(MaxLengthTitle + 1),
  author: fakeAuthorDTO,
};

export const fakeBookAuthorFailed = {
  title: random.words(4),
  author: name.firstName(),
};

export const fakeBookDTO = new BookGetDTO(fakeBook);
export const fakeBookCreateDTO = new BookCreateDTO(fakeBookCreate);
