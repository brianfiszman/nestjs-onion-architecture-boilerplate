import { Nutriscore } from '../enums';
import { ScoreObject } from '../interfaces';

export const initialScoreObject = (): ScoreObject => ({
  A: null,
  C: null,
  energy: 0,
  fat: 0,
  sugar: 0,
  proteins: 0,
  fiber: 0,
  sodium: 0,
  fruits: 0,
  points: 0,
  nutriscore: null,
});

export const getEnergyScoreFromDrink = (energy: number, score: ScoreObject): ScoreObject => {
  energy <= 0
    ? (score.energy += 0)
    : energy <= 30
    ? (score.energy += 1)
    : energy <= 60
    ? (score.energy += 2)
    : energy <= 90
    ? (score.energy += 3)
    : energy <= 120
    ? (score.energy += 4)
    : energy <= 150
    ? (score.energy += 5)
    : energy <= 180
    ? (score.energy += 6)
    : energy <= 210
    ? (score.energy += 7)
    : energy <= 240
    ? (score.energy += 8)
    : energy <= 270
    ? (score.energy += 9)
    : energy > 270
    ? (score.energy += 10)
    : null;
  return score;
};

export const getEnergyScoreFromDefault = (energy: number, score: ScoreObject): ScoreObject => {
  energy <= 335
    ? (score.energy += 0)
    : energy <= 670
    ? (score.energy += 1)
    : energy <= 1005
    ? (score.energy += 2)
    : energy <= 1340
    ? (score.energy += 3)
    : energy <= 1675
    ? (score.energy += 4)
    : energy <= 2010
    ? (score.energy += 5)
    : energy <= 2345
    ? (score.energy += 6)
    : energy <= 2680
    ? (score.energy += 7)
    : energy <= 3015
    ? (score.energy += 8)
    : energy <= 3350
    ? (score.energy += 9)
    : energy > 3350
    ? (score.energy += 10)
    : null;
  return score;
};

export const getFatScore = (fat: number, score: ScoreObject): ScoreObject => {
  fat <= 10
    ? (score.fat += 0)
    : fat <= 16
    ? (score.fat += 1)
    : fat <= 22
    ? (score.fat += 2)
    : fat <= 28
    ? (score.fat += 3)
    : fat <= 34
    ? (score.fat += 4)
    : fat <= 40
    ? (score.fat += 5)
    : fat <= 46
    ? (score.fat += 6)
    : fat <= 52
    ? (score.fat += 7)
    : fat <= 58
    ? (score.fat += 8)
    : fat <= 64
    ? (score.fat += 9)
    : fat > 64
    ? (score.fat += 10)
    : null;
  return score;
};

export const getFatScoreFromDefault = (fat: number, score: ScoreObject): ScoreObject => {
  fat <= 1
    ? (score.fat += 0)
    : fat <= 2
    ? (score.fat += 1)
    : fat <= 3
    ? (score.fat += 2)
    : fat <= 4
    ? (score.fat += 3)
    : fat <= 5
    ? (score.fat += 4)
    : fat <= 6
    ? (score.fat += 5)
    : fat <= 7
    ? (score.fat += 6)
    : fat <= 8
    ? (score.fat += 7)
    : fat <= 9
    ? (score.fat += 8)
    : fat <= 10
    ? (score.fat += 9)
    : fat > 10
    ? (score.fat += 10)
    : null;
  return score;
};

export const getSugarFromDrink = (sugar: number, score: ScoreObject): ScoreObject => {
  sugar <= 0
    ? (score.sugar += 0)
    : sugar <= 1.5
    ? (score.sugar += 1)
    : sugar <= 3
    ? (score.sugar += 2)
    : sugar <= 4.5
    ? (score.sugar += 3)
    : sugar <= 6
    ? (score.sugar += 4)
    : sugar <= 7.5
    ? (score.sugar += 5)
    : sugar <= 9
    ? (score.sugar += 6)
    : sugar <= 10.5
    ? (score.sugar += 7)
    : sugar <= 12
    ? (score.sugar += 8)
    : sugar <= 13.5
    ? (score.sugar += 9)
    : sugar > 13.5
    ? (score.sugar += 10)
    : null;
  return score;
};

export const getSugarFromDefault = (sugar: number, score: ScoreObject): ScoreObject => {
  sugar <= 4.5
    ? (score.sugar += 0)
    : sugar <= 9
    ? (score.sugar += 1)
    : sugar <= 13.5
    ? (score.sugar += 2)
    : sugar <= 18
    ? (score.sugar += 3)
    : sugar <= 22.5
    ? (score.sugar += 4)
    : sugar <= 27
    ? (score.sugar += 5)
    : sugar <= 31
    ? (score.sugar += 6)
    : sugar <= 36
    ? (score.sugar += 7)
    : sugar <= 40
    ? (score.sugar += 8)
    : sugar <= 45
    ? (score.sugar += 9)
    : sugar > 45
    ? (score.sugar += 10)
    : null;
  return score;
};

export const getFruitsFromDrink = (fruits: number, score: ScoreObject): ScoreObject => {
  fruits <= 40
    ? (score.fruits += 0)
    : fruits <= 60
    ? (score.fruits += 2)
    : fruits <= 80
    ? (score.fruits += 4)
    : fruits > 80
    ? (score.fruits += 10)
    : null;
  return score;
};

export const getFruitsFromDefault = (fruits: number, score: ScoreObject): ScoreObject => {
  fruits <= 40
    ? (score.fruits += 0)
    : fruits <= 60
    ? (score.fruits += 1)
    : fruits <= 80
    ? (score.fruits += 2)
    : fruits > 80
    ? (score.fruits += 5)
    : null;
  return score;
};

export const getSodiumScore = (sodium: number, score: ScoreObject): ScoreObject => {
  sodium <= 90
    ? (score.sodium += 0)
    : sodium <= 180
    ? (score.sodium += 1)
    : sodium <= 270
    ? (score.sodium += 2)
    : sodium <= 360
    ? (score.sodium += 3)
    : sodium <= 450
    ? (score.sodium += 4)
    : sodium <= 540
    ? (score.sodium += 5)
    : sodium <= 630
    ? (score.sodium += 6)
    : sodium <= 720
    ? (score.sodium += 7)
    : sodium <= 810
    ? (score.sodium += 8)
    : sodium <= 900
    ? (score.sodium += 9)
    : sodium > 900
    ? (score.sodium += 10)
    : null;
  return score;
};

export const getFiberScore = (fiber: number, score: ScoreObject): ScoreObject => {
  fiber <= 0.7
    ? (score.fiber += 0)
    : fiber <= 1.4
    ? (score.fiber += 1)
    : fiber <= 2.1
    ? (score.fiber += 2)
    : fiber <= 2.8
    ? (score.fiber += 3)
    : fiber <= 3.5
    ? (score.fiber += 4)
    : fiber > 3.5
    ? (score.fiber += 5)
    : null;
  return score;
};

export const getProteinsScore = (proteins: number, score: ScoreObject): ScoreObject => {
  proteins <= 1.6
    ? (score.proteins += 0)
    : proteins <= 3.2
    ? (score.proteins += 1)
    : proteins <= 4.8
    ? (score.proteins += 2)
    : proteins <= 6.4
    ? (score.proteins += 3)
    : proteins <= 8.0
    ? (score.proteins += 4)
    : proteins > 8.0
    ? (score.proteins += 5)
    : null;
  return score;
};

export const getNutriscoreFromDrink = (score: ScoreObject): ScoreObject => {
  score.points <= 0
    ? (score.nutriscore = Nutriscore.A)
    : score.points <= 1
    ? (score.nutriscore = Nutriscore.B)
    : score.points <= 5
    ? (score.nutriscore = Nutriscore.C)
    : score.points <= 9
    ? (score.nutriscore = Nutriscore.D)
    : score.points >= 10
    ? (score.nutriscore = Nutriscore.E)
    : null;
  return score;
};

export const getNutriscoreFromDefault = (score: ScoreObject): ScoreObject => {
  score.points <= -1
    ? (score.nutriscore = Nutriscore.A)
    : score.points <= 2
    ? (score.nutriscore = Nutriscore.B)
    : score.points <= 10
    ? (score.nutriscore = Nutriscore.C)
    : score.points <= 18
    ? (score.nutriscore = Nutriscore.D)
    : score.points >= 19
    ? (score.nutriscore = Nutriscore.E)
    : null;
  return score;
};
