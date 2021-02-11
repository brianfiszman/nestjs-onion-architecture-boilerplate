import { clone } from 'ramda';
import { Nutriscore } from '../../src/domain/enums';
import {
  getEnergyScoreFromDefault,
  getEnergyScoreFromDrink,
  getFatScore,
  getFatScoreFromDefault,
  getFiberScore,
  getFruitsFromDefault,
  getFruitsFromDrink,
  getNutriscoreFromDefault,
  getNutriscoreFromDrink,
  getProteinsScore,
  getSodiumScore,
  getSugarFromDefault,
  getSugarFromDrink,
  initialScoreObject,
} from '../../src/domain/helpers';
import { ScoreObject } from '../../src/domain/interfaces';

describe('Nutriscore helper functions', () => {
  let scoreObject: ScoreObject;

  beforeEach(() => {
    scoreObject = initialScoreObject();
  });

  describe('[Energy]', () => {
    it('Should get correct energy score from drink', () => {
      const testCases = [
        [0, 0],
        [30, 1],
        [60, 2],
        [90, 3],
        [120, 4],
        [150, 5],
        [180, 6],
        [210, 7],
        [240, 8],
        [270, 9],
        [271, 10],
      ];

      testCases.map(([energy, result]) => {
        const score = getEnergyScoreFromDrink(energy, clone(scoreObject));
        expect(score.energy).toBe(result);
      });
    });

    it('Should get correct energy score from default', () => {
      const testCases = [
        [335, 0],
        [670, 1],
        [1005, 2],
        [1340, 3],
        [1675, 4],
        [2010, 5],
        [2345, 6],
        [2680, 7],
        [3015, 8],
        [3350, 9],
        [3351, 10],
      ];

      testCases.map(([energy, result]) => {
        const score = getEnergyScoreFromDefault(energy, clone(scoreObject));
        expect(score.energy).toBe(result);
      });
    });
  });

  describe('[Fat]', () => {
    it('Should get correct fat score', () => {
      const testCases = [
        [10, 0],
        [16, 1],
        [22, 2],
        [28, 3],
        [34, 4],
        [40, 5],
        [46, 6],
        [52, 7],
        [58, 8],
        [64, 9],
        [65, 10],
      ];

      testCases.map(([fat, result]) => {
        const score = getFatScore(fat, clone(scoreObject));
        expect(score.fat).toBe(result);
      });
    });

    it('Should get correct fat score from default', () => {
      const testCases = [
        [1, 0],
        [2, 1],
        [3, 2],
        [4, 3],
        [5, 4],
        [6, 5],
        [7, 6],
        [8, 7],
        [9, 8],
        [10, 9],
        [11, 10],
      ];

      testCases.map(([fat, result]) => {
        const score = getFatScoreFromDefault(fat, clone(scoreObject));
        expect(score.fat).toBe(result);
      });
    });
  });

  describe('[Sugar]', () => {
    it('Should get correct sugar score from drink', () => {
      const testCases = [
        [0, 0],
        [1.5, 1],
        [3, 2],
        [4.5, 3],
        [6, 4],
        [7.5, 5],
        [9, 6],
        [10.5, 7],
        [12, 8],
        [13.5, 9],
        [13.6, 10],
      ];

      testCases.map(([sugar, result]) => {
        const score = getSugarFromDrink(sugar, clone(scoreObject));
        expect(score.sugar).toBe(result);
      });
    });

    it('Should get correct sugar score from default', () => {
      const testCases = [
        [4.5, 0],
        [9, 1],
        [13.5, 2],
        [18, 3],
        [22.5, 4],
        [27, 5],
        [31, 6],
        [36, 7],
        [40, 8],
        [45, 9],
        [46, 10],
      ];

      testCases.map(([sugar, result]) => {
        const score = getSugarFromDefault(sugar, clone(scoreObject));
        expect(score.sugar).toBe(result);
      });
    });
  });

  describe('[Fruits]', () => {
    it('Should get correct fruits score from drink', () => {
      const testCases = [
        [40, 0],
        [60, 2],
        [80, 4],
        [81, 10],
      ];

      testCases.map(([fruits, result]) => {
        const score = getFruitsFromDrink(fruits, clone(scoreObject));
        expect(score.fruits).toBe(result);
      });
    });

    it('Should get correct fruits score from default', () => {
      const testCases = [
        [40, 0],
        [60, 1],
        [80, 2],
        [81, 5],
      ];

      testCases.map(([fruits, result]) => {
        const score = getFruitsFromDefault(fruits, clone(scoreObject));
        expect(score.fruits).toBe(result);
      });
    });
  });

  describe('[Sodium]', () => {
    it('Should get correct sodium score', () => {
      const testCases = [
        [90, 0],
        [180, 1],
        [270, 2],
        [360, 3],
        [450, 4],
        [540, 5],
        [630, 6],
        [720, 7],
        [810, 8],
        [900, 9],
        [901, 10],
      ];

      testCases.map(([sodium, result]) => {
        const score = getSodiumScore(sodium, clone(scoreObject));
        expect(score.sodium).toBe(result);
      });
    });
  });

  describe('[Fiber]', () => {
    it('Should get correct fiber score', () => {
      const testCases = [
        [0.7, 0],
        [1.4, 1],
        [2.1, 2],
        [2.8, 3],
        [3.5, 4],
        [3.6, 5],
      ];

      testCases.map(([fiber, result]) => {
        const score = getFiberScore(fiber, clone(scoreObject));
        expect(score.fiber).toBe(result);
      });
    });
  });

  describe('[Proteins]', () => {
    it('Should get correct proteins score', () => {
      const testCases = [
        [1.6, 0],
        [3.2, 1],
        [4.8, 2],
        [6.4, 3],
        [8.0, 4],
        [8.1, 5],
      ];

      testCases.map(([proteins, result]) => {
        const score = getProteinsScore(proteins, clone(scoreObject));
        expect(score.proteins).toBe(result);
      });
    });
  });

  describe('[Nutriscore]', () => {
    it('Should get correct nutriscore value from drink', () => {
      const testCases = [
        [0, Nutriscore.A],
        [1, Nutriscore.B],
        [5, Nutriscore.C],
        [9, Nutriscore.D],
        [10, Nutriscore.E],
      ];

      testCases.map(([points, result]) => {
        scoreObject.points = points as number;
        const score = getNutriscoreFromDrink(clone(scoreObject));
        expect(score.nutriscore).toBe(result);
      });
    });

    it('Should get correct nutriscore value from default', () => {
      const testCases = [
        [-1, Nutriscore.A],
        [2, Nutriscore.B],
        [10, Nutriscore.C],
        [18, Nutriscore.D],
        [19, Nutriscore.E],
      ];

      testCases.map(([points, result]) => {
        scoreObject.points = points as number;
        const score = getNutriscoreFromDefault(clone(scoreObject));
        expect(score.nutriscore).toBe(result);
      });
    });
  });
});
