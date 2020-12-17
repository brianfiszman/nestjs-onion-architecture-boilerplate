import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthorCreateDTO } from '../../src/application/dtos/author/author-create.dto';
import { AuthorGetDTO } from '../../src/application/dtos/author';
import { fakeAuthor, fakeAuthorMaxLength, fakeAuthorDTO, fakeAuthorCreateDTO } from './../factories/author.factory';

describe('Author DTO', () => {
  describe('Author create', () => {
    it('Requires [name] property', async () => {
      const data = {
        email: fakeAuthor.email,
      };
      const dto = plainToClass(AuthorCreateDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('name');
    });

    it('Requires [email] property', async () => {
      const data = {
        name: fakeAuthor.name,
      };
      const dto = plainToClass(AuthorCreateDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('email');
    });

    it('Failed with max length', async () => {
      const dto = plainToClass(AuthorCreateDTO, fakeAuthorMaxLength);

      const errors = await validate(dto);

      expect(errors).toHaveLength(2);

      errors &&
        errors.map(error => {
          expect(error).toBeInstanceOf(ValidationError);
        });
    });

    it('Succes with a valid properties', async () => {
      const errors = await validate(fakeAuthorCreateDTO);

      expect(errors).toHaveLength(0);
    });
  });

  describe('Author get', () => {
    it('Success with a valid properties', async () => {
      const errors = await validate(fakeAuthorDTO);

      expect(errors).toHaveLength(0);
    });

    it('Requires [id] property', async () => {
      const { _id, ...data } = fakeAuthor;
      const dto = plainToClass(AuthorGetDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('_id');
    });

    it('Requires [name] property', async () => {
      const { name, ...data } = fakeAuthor;
      const dto = plainToClass(AuthorGetDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('name');
    });

    it('Requires [email] property', async () => {
      const { email, ...data } = fakeAuthor;
      const dto = plainToClass(AuthorGetDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('email');
    });

    it('Requires [born] property', async () => {
      const { born, ...data } = fakeAuthor;
      const dto = plainToClass(AuthorGetDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('born');
    });
  });
});
