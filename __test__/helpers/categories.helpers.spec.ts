import { categoriesMock } from './../mocks/categories.mock';
import { Categories } from '../../src/domain/interfaces';
import { getCategoryFromCode } from '../../src/domain/helpers';
import { random } from 'faker';

describe('Test categories helpers functions', () => {
  let categories: Categories;

  const INVALID_CATEGORY_CODE = random.number();
  const VALID_CATEGORY_CODE = 70052;

  beforeEach(() => {
    categories = categoriesMock;
  });

  describe('[getCategoryFromCode]', () => {
    it('Should return null if received an invalid category code', () => {
      const CategoryChild = getCategoryFromCode(INVALID_CATEGORY_CODE, categories);

      expect(CategoryChild).toBe(null);
    });

    it('Should receive a category code and return valid category children object', () => {
      const result = getCategoryFromCode(VALID_CATEGORY_CODE, categories) || {};

      const {
        children: [{ children }],
      } = categories;
      const [categoryChildren] = children || [];

      Object.keys(categoryChildren).map(key => {
        expect(result).toHaveProperty(key);
      });
    });

    it('Should receive a category code and return the correct category children', () => {
      const { code } = getCategoryFromCode(VALID_CATEGORY_CODE, categories) || {};

      expect(code).toBe(VALID_CATEGORY_CODE.toString());
    });
  });
});
