import { getFakeNutritionals } from '../factories/product.factory';
import { getNutriscore, getNutriscoreOptions } from '../../src/domain/helpers';
import { Nutritional } from '../../src/domain/interfaces';
import { Hints, Nutriscore } from '../../src/domain/enums';

describe('Test nutritionals helpers functions', () => {
  let nutritionals: Nutritional;

  beforeEach(() => {
    nutritionals = getFakeNutritionals();
  });

  describe('[getNutriscoreOptions]', () => {
    it('Should return a valid options object from nutritionals object', () => {
      const nsOptions = getNutriscoreOptions(nutritionals);

      expect(nsOptions).toHaveProperty('fruits');
      expect(nsOptions).toHaveProperty('itsDrink');
      expect(nsOptions).toHaveProperty('itsCheese');
      expect(nsOptions).toHaveProperty('itsFat');
    });
  });

  describe('[getNutriscore]', () => {
    it('Should return a valid nutriscore object', () => {
      const options = getNutriscoreOptions(nutritionals);
      const result = getNutriscore(options);

      expect(result).toHaveProperty('nutriscore');
      expect(result).toHaveProperty('points');
      expect(result).toHaveProperty('hint');
    });

    it('Should return a valid nutriscore type', () => {
      const options = getNutriscoreOptions(nutritionals);
      const result = getNutriscore(options);

      expect(typeof result.nutriscore).toBe('string');
    });

    it('Should return a valid nutriscore value', () => {
      const options = getNutriscoreOptions(nutritionals);
      const { nutriscore } = getNutriscore(options);

      expect(Nutriscore[nutriscore]).toBeDefined();
    });

    it('Should return a valid hint value', () => {
      const options = getNutriscoreOptions(nutritionals);
      const { hint } = getNutriscore(options);

      expect(Hints[hint]).toBeDefined();
    });

    it('Should return correct nutriscore according to nutritionals provided', () => {
      nutritionals = {
        nutriscore: null,
        nutriscorePoints: null,
        nutriscoreReported: Nutriscore.A,
        hint: Hints.ok,
        caloriesKj: 1775,
        caloriesKcal: 424.24,
        fat: 15,
        saturatedFat: 1.2,
        glucids: 72,
        sugar: null,
        fiber: 5.1,
        proteins: 6,
        salt: 0.22,
      };
      const options = getNutriscoreOptions(nutritionals);
      const { hint, nutriscore, points } = getNutriscore(options);

      expect(hint).toBe(Hints.ok);
      expect(nutriscore).toBe(Nutriscore.A);
      expect(points).toBe(-2);
    });
  });
});
