import { name, date, internet, lorem, random } from 'faker';
import { v4 as uuid } from 'uuid';
import { MovieCreateDTO, MovieGetDTO } from '../../src/application/dtos/movie';
import { Movie } from '../../src/domain/entities';
import { Categories } from '../../src/domain/enums';

const MaxLengthName = 50;
const MaxLengthDescription = 100;

export const fakeMovie: Movie = {
  _id: uuid(),
  title: name.firstName(),
  url: internet.url(),
  description: lorem.word(MaxLengthDescription),
  categories: new Set(
    random.arrayElements([
      Categories.Action,
      Categories.Comedy,
      Categories.Drama,
      Categories.Mistery,
      Categories.Romance,
      Categories.Thriller,
    ])
  ),
  publishDate: date.past(),
};

export const fakeMovieCreate: MovieCreateDTO = {
  title: name.firstName(),
  url: internet.url(),
  description: lorem.word(MaxLengthDescription),
  categories: new Set(
    random.arrayElements([
      Categories.Action,
      Categories.Comedy,
      Categories.Drama,
      Categories.Mistery,
      Categories.Romance,
      Categories.Thriller,
    ])
  ),
  publishDate: date.past(),
};

export const fakeMovieMaxLength: MovieCreateDTO = {
  title: lorem.word(MaxLengthName + 1),
  url: lorem.word(MaxLengthDescription + 1),
  categories: new Set(
    random.arrayElements([
      Categories.Action,
      Categories.Comedy,
      Categories.Drama,
      Categories.Mistery,
      Categories.Romance,
      Categories.Thriller,
    ])
  ),
};

export const fakeMovieDTO = new MovieGetDTO(fakeMovie);
export const fakeMovieCreateDTO = new MovieCreateDTO(fakeMovieCreate);
