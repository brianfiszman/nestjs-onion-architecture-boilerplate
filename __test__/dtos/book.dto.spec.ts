import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BookCreateDTO } from '../../src/application/dtos/book';
import { fakeAuthorCreateDTO } from './../../src/infrastructure/mocks/author.mock';
import {
  fakeBook,
  fakeBookMaxLength,
  fakeBookCreateDTO,
  fakeBookAuthorFailed,
  fakeBookDTO,
} from './../../src/infrastructure/mocks/book.mock';

describe('Book DTO', () => {
  describe('Book create', () => {
    it('Requires [title] property', async () => {
      const data = {
        id: fakeBook.id,
        author: fakeAuthorCreateDTO,
      };
      const dto = plainToClass(BookCreateDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('title');
    });

    it('Requires [author] property', async () => {
      const data = {
        id: fakeBook.id,
        title: fakeBook.title,
      };
      const dto = plainToClass(BookCreateDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('author');
    });

    it('author property must be an Object', async () => {
      const dto = plainToClass(BookCreateDTO, fakeBookAuthorFailed);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error.property).toBe('author');
    });

    it('Failed with max length', async () => {
      const dto = plainToClass(BookCreateDTO, fakeBookMaxLength);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('title');
    });

    it('Success with a valid properties', async () => {
      const errors = await validate(fakeBookCreateDTO);

      expect(errors).toHaveLength(0);
    });
  });

  describe('Book get', () => {
    it('Success with a valid properties', async () => {
      const errors = await validate(fakeBookDTO);

      expect(errors).toHaveLength(0);
    });
  });
});