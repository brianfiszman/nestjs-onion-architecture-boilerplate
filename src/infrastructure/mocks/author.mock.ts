import { name, date, internet, lorem } from 'faker';
import { uuid } from 'uuidv4';

const MaxLengthName = 50;
const MaxLengthEmail = 100;

export const fakeAuthorCreateDTO = {
  name: name.firstName(),
  email: internet.email(),
};

export const fakeAuthor = {
  id: uuid(),
  name: name.firstName(),
  email: internet.email(),
  born: date.past(),
};

export const fakeAuthorMaxLength = {
  name: lorem.word(MaxLengthName + 1),
  email: lorem.word(MaxLengthEmail + 1),
};
