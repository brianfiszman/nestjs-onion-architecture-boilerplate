import { Test, TestingModule } from '@nestjs/testing';
import { FactoryService } from '../../src/domain/services/';
import {
  getFakeAllergens,
  getFakeEan,
  getFakeNutritionals,
  getFakeProduct,
  getFakeSource,
  getFakeSourceProduct,
} from '../factories/product.factory';
import { AllergensValues, Hints, Status } from '../../src/domain/enums';

describe('Product Service', () => {
  let service: FactoryService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactoryService],
    }).compile();

    service = module.get<FactoryService>(FactoryService);
  });

  describe('Test initial product getter', () => {
    it('Should return an initial product with correct properties', () => {
      const { _id, ...fakeProduct } = getFakeProduct();
      const productPropierties = Object.keys(fakeProduct);
      const ean = getFakeEan();
      const product = service.createInitialProduct(ean);

      productPropierties.map(prop => {
        expect(product).toHaveProperty(prop);
      });
    });

    it('Should set default name if not received a product name', () => {
      const ean = getFakeEan();
      const product = service.createInitialProduct(ean);
      const [{ product: productSource }] = product.source;

      expect(productSource.name).toBe('Produit sans nom');
    });

    it('Should set default status if not received a product status', () => {
      const ean = getFakeEan();
      const product = service.createInitialProduct(ean);

      expect(product.status).toBe(Status.DEFAULT);
    });
  });

  describe('Test initial source getter', () => {
    it('Should return a valid source object', () => {
      const source = service.createSource('Produit sans nom');
      const sourceProperties = Object.keys(getFakeSource());

      sourceProperties.map(prop => {
        expect(source).toHaveProperty(prop);
      });
    });
  });

  describe('Test initial source product getter', () => {
    it('Should return a valid source product object', () => {
      const product = service.createProductSource('Produit sans nom');
      const productProperties = Object.keys(getFakeSourceProduct());

      productProperties.map(prop => {
        expect(product).toHaveProperty(prop);
      });
    });
  });

  describe('Test initial allergens getter', () => {
    it('Should return a valid allergens object', () => {
      const allergens = service.createAllergens();
      const allergensProperties = Object.keys(getFakeAllergens());

      allergensProperties.map(prop => {
        expect(allergens).toHaveProperty(prop);
      });
    });

    it('Should return initial allergens with default value', () => {
      const allergens = service.createAllergens();

      Object.entries(allergens).map(([key, value]) => {
        expect(value.value).toBe(AllergensValues['n/a']);
      });
    });
  });

  describe('Test initial nutritionals getter', () => {
    it('Should return a valid nutritionals object', () => {
      const nutritionals = service.createNutritionals();
      const nutritionalsProperties = Object.keys(getFakeNutritionals());

      nutritionalsProperties.map(prop => {
        expect(nutritionals).toHaveProperty(prop);
      });
    });

    it('Should return nutritionals with default hint', () => {
      const nutritionals = service.createNutritionals();

      expect(nutritionals.hint).toBe(Hints.no);
    });
  });
});
