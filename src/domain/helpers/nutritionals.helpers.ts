import { Hints } from '../enums';
import { NutriscoreOptions, NutriscoreResult, Nutritional, ScoreObject } from '../interfaces';
import {
  getEnergyScoreFromDrink,
  getEnergyScoreFromDefault,
  getFatScore,
  getFatScoreFromDefault,
  getSugarFromDrink,
  getSugarFromDefault,
  getSodiumScore,
  getFruitsFromDrink,
  getFruitsFromDefault,
  getFiberScore,
  getProteinsScore,
  getNutriscoreFromDrink,
  getNutriscoreFromDefault,
  initialScoreObject,
} from './nutriscore';

export const getNutriscoreOptions = (data: Nutritional): NutriscoreOptions => ({
  energy: data.caloriesKj || 0,
  fat: data.saturatedFat || 0,
  sugar: data.sugar || 0,
  proteins: data.proteins || 0,
  fiber: data.fiber || 0,
  sodium: (data.salt && data.salt * 400) || 0,
  fruits: 0,
  itsDrink: data.hint === Hints.bebida,
  itsCheese: data.hint === Hints.queso,
  itsFat: data.hint === Hints.grasa,
  hint: data.hint || Hints.no,
});

export const getNutriscore = (opt: NutriscoreOptions): NutriscoreResult => {
  const { energy, fat, sugar, proteins, fiber, sodium, fruits, itsDrink, itsCheese, itsFat, hint } = opt;
  const score: ScoreObject = initialScoreObject();

  itsDrink ? getEnergyScoreFromDrink(energy, score) : getEnergyScoreFromDefault(energy, score);
  itsFat ? getFatScore(fat, score) : getFatScoreFromDefault(fat, score);
  itsDrink ? getSugarFromDrink(sugar, score) : getSugarFromDefault(sugar, score);
  itsDrink ? getFruitsFromDrink(fruits, score) : getFruitsFromDefault(fruits, score);
  getSodiumScore(sodium, score);
  getFiberScore(fiber, score);
  getProteinsScore(proteins, score);

  score.A = score.energy + score.sugar + score.fat + score.sodium;
  score.C = score.fruits + score.fiber + score.proteins;

  if (score.A < 11 || itsCheese) {
    score.points = score.A - score.C;
  } else {
    score.fruits >= 5 ? (score.points = score.A - score.C) : (score.points = score.A - (score.fruits + score.fiber));
  }

  itsDrink ? getNutriscoreFromDrink(score) : getNutriscoreFromDefault(score);

  return {
    nutriscore: score.nutriscore as any,
    points: score.points,
    hint,
  };
};
