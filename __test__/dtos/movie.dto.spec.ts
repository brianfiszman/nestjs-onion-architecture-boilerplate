import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { MovieCreateDTO } from '../../src/application/dtos/movie/movie-create.dto';
import { MovieGetDTO } from '../../src/application/dtos/movie';
import { fakeMovie, fakeMovieMaxLength, fakeMovieDTO, fakeMovieCreateDTO } from './../factories/movie.factory';

describe('Movie DTO', () => {
  describe('Movie create', () => {
    it('Requires [title] property', async () => {
      const data = {
        url: fakeMovie.url,
      };
      const dto = plainToClass(MovieCreateDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('title');
    });

    it('Requires [url] property', async () => {
      const data = {
        title: fakeMovie.url,
      };
      const dto = plainToClass(MovieCreateDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('url');
    });

    it('Failed with max length', async () => {
      const dto = plainToClass(MovieCreateDTO, fakeMovieMaxLength);

      const errors = await validate(dto);

      expect(errors).toHaveLength(2);

      errors &&
        errors.map(error => {
          expect(error).toBeInstanceOf(ValidationError);
        });
    });

    it('Succes with a valid properties', async () => {
      const errors = await validate(fakeMovieCreateDTO);

      expect(errors).toHaveLength(0);
    });
  });

  describe('Movie get', () => {
    it('Success with a valid properties', async () => {
      const errors = await validate(fakeMovieDTO);

      expect(errors).toHaveLength(1);
    });

    it('Requires [id] property', async () => {
      const { _id, ...data } = fakeMovie;
      const dto = plainToClass(MovieGetDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('_id');
    });

    it('Requires [title] property', async () => {
      const { title, ...data } = fakeMovie;
      const dto = plainToClass(MovieGetDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('title');
    });

    it('Requires [url] property', async () => {
      const { url, ...data } = fakeMovie;
      const dto = plainToClass(MovieGetDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('url');
    });

    it('Requires [categories] property', async () => {
      const { categories, ...data } = fakeMovie;
      const dto = plainToClass(MovieGetDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toBeDefined();
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('categories');
    });
  });
});
