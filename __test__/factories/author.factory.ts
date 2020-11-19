import { plainToClass } from 'class-transformer';
import { name, date, internet, lorem } from 'faker';
import { v4 as uuid } from 'uuid';
import { AuthorCreateDTO, AuthorGetDTO } from '../../src/application/dtos/author';

const MaxLengthName = 50;
const MaxLengthEmail = 100;

export const fakeAuthor = {
  id: uuid(),
  name: name.firstName(),
  email: internet.email(),
  born: date.past(),
};

export const fakeAuthorCreate = {
  name: name.firstName(),
  email: internet.email(),
};

export const fakeAuthorMaxLength = {
  name: lorem.word(MaxLengthName + 1),
  email: lorem.word(MaxLengthEmail + 1),
};

export const fakeAuthorDTO = plainToClass(AuthorGetDTO, fakeAuthor);
export const fakeAuthorCreateDTO = plainToClass(AuthorCreateDTO, fakeAuthorCreate);
