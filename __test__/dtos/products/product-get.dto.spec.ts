import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { random } from 'faker';
import { getFakeProduct } from '../../factories/product.factory';
import { ProductGetDto } from './../../../src/application/dtos/product';
import { Product } from '../../../src/domain/interfaces';

describe('Product DTOs', () => {
  describe('Product Get', () => {
    it('Should get an success with a valid properties', async () => {
      const product: Product = getFakeProduct();

      const dto = plainToClass(ProductGetDto, product);
      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });

    it('Ean must be a valid ean code', async () => {
      const product = getFakeProduct({
        productProps: {
          ean: random.word(),
        },
      });
      const dto = plainToClass(ProductGetDto, product);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('ean');
    });

    it('Product should have a valid region object', async () => {
      const product = getFakeProduct({
        productProps: {
          region: null,
        },
      });
      const dto = plainToClass(ProductGetDto, product);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('region');
    });

    it('Product should have a valid source', async () => {
      const product = getFakeProduct({
        productProps: {
          source: null,
        },
      });
      const dto = plainToClass(ProductGetDto, product);

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('source');
    });
  });
});
