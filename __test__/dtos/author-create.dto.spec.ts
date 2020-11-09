import { AuthorCreateDTO } from './../../src/application/dtos/author/author-create.dto';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

describe('Author Dto', () => {
  describe('Create Author Dto', () => {
    it('Requires [name] property', async () => {
      const data = {
        email: 'fakemail@hotmail.com',
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
        name: 'John Doe',
      };
      const dto = plainToClass(AuthorCreateDTO, data);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('email');
    });

    it('Succes with a valid properties', async () => {
      const data = {
        name: 'John Doe',
        email: 'email@mail.com',
      };

      const dto = plainToClass(AuthorCreateDTO, data);
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });
  });
});
