import { Hints, Nutriscore } from '../../enums';

export interface NutriscoreOptions {
  energy: number;
  fat: number;
  sugar: number;
  proteins: number;
  fiber: number;
  sodium: number;
  fruits: number;
  itsDrink: boolean;
  itsCheese: boolean;
  itsFat: boolean;
  hint: Hints;
}

export interface ScoreObject {
  A: number | null;
  C: number | null;
  energy: number;
  fat: number;
  sugar: number;
  proteins: number;
  fiber: number;
  sodium: number;
  fruits: number;
  points: number;
  nutriscore: string | null;
}

export interface NutriscoreResult {
  nutriscore: Nutriscore;
  points: number;
  hint: Hints;
}
