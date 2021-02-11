export enum Regions {
  FR = 'FR',
  ES = 'ES',
  DEFAULT = 'FR',
}

export enum Locales {
  FR = 'FR',
  ES = 'ES',
  EN = 'EN',
}

export enum Status {
  pending = 'pending',
  active = 'active',
  inactive = 'inactive',
  cancelled = 'cancelled',
  'not apply' = 'not apply',
  incomplete = 'incomplete',
  DEFAULT = 'pending',
}

export enum Sources {
  ALKEMICS = 'Alkemics',
}

export enum AllergensList {
  gluten = 'gluten',
  milk = 'milk',
  soybeans = 'soybeans',
  peanuts = 'peanuts',
  celery = 'celery',
  eggs = 'eggs',
  molluscs = 'molluscs',
  'tree nuts' = 'tree nuts',
  fish = 'fish',
  mustard = 'mustard',
  'sesame seeds' = 'sesame seeds',
  'sulfur dioxide and sulfits' = 'sulfur dioxide and sulfits',
  lupine = 'lupine',
  crustaceans = 'crustaceans',
}

export enum AllergensValues {
  'n/a' = 'n/a',
  traces = 'traces',
  yes = 'yes',
  no = 'no',
}

export enum AllergensContainType {
  CONTAINS = 'CONTAINS',
  MAY_CONTAIN = 'MAY_CONTAIN',
  FREE_FROM = 'FREE_FROM',
  UNDECLARED = 'UNDECLARED',
}

export const AllergensListMock: any[] = [
  {
    id: 854,
    name: [
      'GlutenIncluded',
      'gluten',
      'Gluten',
      'oat and oat products (gluten containing grain)',
      'barley and barley products (glutencontaining grain)',
      'cereals containing gluten',
      'other gluten containing grain and gluten containing grain products',
      'wheat',
    ],
    label: 'gluten',
  },
  { id: 855, name: ['LactoseIncluded', 'Lactose', 'milk'], label: 'milk' },
  { id: 856, name: ['SoyIncluded', 'soybeans', 'Soja'], label: 'soybeans' },
  { id: 857, name: ['ArachidIncluded', 'nuts'], label: 'peanuts' },
  { id: 858, name: ['CeleryIncluded', 'celery', 'Cèleri'], label: 'celery' },
  { id: 859, name: ['EggIncluded', 'eggs', 'oeuf'], label: 'eggs' },
  { id: 860, name: ['CrustaceansIncluded'], label: 'crustaceans' },
  {
    id: 861,
    name: ['FruitACoqueIncluded', 'hazelnut and hazelnut products'],
    label: 'tree nuts',
  },
  { id: 862, name: ['FishIncluded'], label: 'fish' },
  { id: 863, name: ['MustardIncluded'], label: 'mustard' },
  { id: 864, name: ['SesamIncluded'], label: 'sesame seeds' },
  {
    id: 865,
    name: ['SulfiteIncluded', 'sulphur-dioxide-and-sulphites', 'sulfur dioxide and sulfits'],
    label: 'sulfur dioxide and sulfits',
  },
  { id: 866, name: ['LupinIncluded'], label: 'lupine' },
  { id: 867, name: ['MollusqueIncluded'], label: 'molluscs' },
];

export enum ImageTypes {
  front = 'front',
  nutritional = 'nutritional',
  ingredients = 'ingredients',
  other = 'other',
}

export enum ImageProductFace {
  front,
  left,
  top,
  back,
  right,
  bottom,
  other,
}

export enum ImageQuality {
  DEFAULT = 7,
}

export enum ImageDefaultSize {
  width = 150,
  height = 150,
}

export enum Nutriscore {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  '' = '',
}

export enum Hints {
  queso = 'queso',
  grasa = 'grasa',
  bebida = 'bebida',
  no = 'no',
  ok = 'ok',
}

export enum Nutritionals {
  NUTRISCORE = 'nutriscore',
  NUTRISCORE_POINTS = 'nutriscorePoints',
  NUTRISCORE_REPORTED = 'nutriscoreReported',
  HINT = 'hint',
  CALORIES_KJ = 'caloriesKj',
  CALORIES_KCAL = 'caloriesKcal',
  FAT = 'fat',
  SATURATED_FAT = 'saturatedFat',
  GLUCIDS = 'glucids',
  SUGAR = 'sugar',
  FIBER = 'fiber',
  PROTEINS = 'proteins',
  SALT = 'salt',
}

export const CALORIC_EQUIVALENT = 4.184;

export enum DefaultProperties {
  NAME = 'Produit sans nom',
}
