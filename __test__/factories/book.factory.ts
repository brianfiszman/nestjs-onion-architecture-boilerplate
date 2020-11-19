import { plainToClass } from 'class-transformer';
import { random, lorem, name } from 'faker';
import { v4 as uuid } from 'uuid';
import { BookCreateDTO } from '../../src/application/dtos/book';
import { BookGetDTO } from '../../src/application/dtos/book/book-get.dto';
import { fakeAuthorDTO } from './author.factory';

const MaxLengthTitle = 50;

export const fakeBookCreate = {
  title: random.words(4),
  author: fakeAuthorDTO,
};

export const fakeBook = {
  id: uuid(),
  title: random.words(4),
  author: fakeAuthorDTO,
};

export const fakeBookMaxLength = {
  title: lorem.word(MaxLengthTitle + 1),
  author: fakeAuthorDTO,
};

export const fakeBookAuthorFailed = {
  title: random.words(4),
  author: name.firstName(),
};

export const fakeBookDTO = plainToClass(BookGetDTO, fakeBook);
export const fakeBookCreateDTO = plainToClass(BookCreateDTO, fakeBookCreate);
