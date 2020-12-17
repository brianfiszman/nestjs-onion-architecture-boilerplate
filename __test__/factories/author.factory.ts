import { name, date, internet, lorem } from 'faker';
import { v4 as uuid } from 'uuid';
import { AuthorCreateDTO, AuthorGetDTO } from '../../src/application/dtos/author';
import { Author } from '../../src/domain/entities';

const MaxLengthName = 50;
const MaxLengthEmail = 100;

export const fakeAuthor: Author = {
  _id: uuid(),
  name: name.firstName(),
  email: internet.email(),
  born: date.past(),
};

export const fakeAuthorCreate: AuthorCreateDTO = {
  name: name.firstName(),
  email: internet.email(),
};

export const fakeAuthorMaxLength: AuthorCreateDTO = {
  name: lorem.word(MaxLengthName + 1),
  email: lorem.word(MaxLengthEmail + 1),
};

export const fakeAuthorDTO = new AuthorGetDTO(fakeAuthor);
export const fakeAuthorCreateDTO = new AuthorCreateDTO(fakeAuthorCreate);
