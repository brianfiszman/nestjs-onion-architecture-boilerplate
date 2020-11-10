import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { uuid } from 'uuidv4';
import { name, date, internet, lorem } from 'faker';
import { AuthorCreateDTO } from '../../src/application/dtos/author/author-create.dto';
import { AuthorGetDTO } from '../../src/application/dtos/author';

describe('Author DTO', () => {
  const faker = {
    id: uuid(),
    name: name.firstName(),
    email: internet.email(),
    born: date.past(),
  };
  describe('Author create', () => {
    it('Requires [name] property', async () => {
      const data = {
        email: faker.email,
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
        name: faker.name,
      };
      const dto = plainToClass(AuthorCreateDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('email');
    });

    it('Failed with max length', async () => {
      const MaxLengthName = 50;
      const MaxLengthEmail = 100;

      const data = {
        name: lorem.word(MaxLengthName + 1),
        email: lorem.word(MaxLengthEmail + 1),
      };
      const dto = plainToClass(AuthorCreateDTO, data);

      const errors = await validate(dto);

      expect(errors).toHaveLength(2);

      errors &&
        errors.map(error => {
          expect(error).toBeInstanceOf(ValidationError);
        });
    });

    it('Succes with a valid properties', async () => {
      const data = {
        name: faker.name,
        email: faker.email,
      };

      const dto = plainToClass(AuthorCreateDTO, data);
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });
  });

  describe('Author get', () => {
    it('Success with a valid properties', async () => {
      const dto = plainToClass(AuthorGetDTO, faker);
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });

    it('Requires [id] property', async () => {
      const { id, ...data } = faker;
      const dto = plainToClass(AuthorGetDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('id');
    });

    it('Requires [name] property', async () => {
      const { name, ...data } = faker;
      const dto = plainToClass(AuthorGetDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('name');
    });

    it('Requires [email] property', async () => {
      const { email, ...data } = faker;
      const dto = plainToClass(AuthorGetDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('email');
    });

    it('Requires [born] property', async () => {
      const { born, ...data } = faker;
      const dto = plainToClass(AuthorGetDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('born');
    });
  });
});
