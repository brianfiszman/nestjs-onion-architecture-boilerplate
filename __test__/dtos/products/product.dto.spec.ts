import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { random } from 'faker';
import { getFakeProduct } from '../../factories/product.factory';
import { ProductCreateDTO } from './../../../src/application/dtos/product';

describe('Product DTOs', () => {
  describe('Product create', () => {
    it('Should get an success with a valid properties', async () => {
      const { ean, source, region } = getFakeProduct();
      const dto = plainToClass(ProductCreateDTO, { ean, source, region });

      const errors = await validate(dto);

      expect(errors).toHaveLength(0);
    });

    it('Ean must be a valid ean number', async () => {
      const { ean, source, region } = getFakeProduct({
        productProps: {
          ean: random.word(),
        },
      });
      const dto = plainToClass(ProductCreateDTO, { ean, source, region });

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('ean');
    });

    it('Product should have a valid region', async () => {
      const { ean, source, region } = getFakeProduct({
        productProps: {
          region: null,
        },
      });
      const dto = plainToClass(ProductCreateDTO, { ean, source, region });

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('region');
    });

    it('Product should have a valid source', async () => {
      const { ean, source, region } = getFakeProduct({
        productProps: {
          source: null,
        },
      });
      const dto = plainToClass(ProductCreateDTO, { ean, source, region });

      const errors = await validate(dto);
      const [error] = errors;

      expect(errors).toHaveLength(1);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.property).toBe('source');
    });
  });
});
