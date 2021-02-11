import {
  AllergensList,
  AllergensValues,
  Hints,
  ImageTypes,
  Locales,
  Nutriscore,
  Regions,
  Sources,
  Status,
} from '../../enums';

export interface Product {
  _id?: string;
  ean: string;
  status: string;
  defaultLc: string;
  region: Record<string, Region>;
  score: number;
  source: Source[];
  _schema: number;
  updated: Date;
}

export interface Tag {
  value: string;
  region: Regions;
  lc: Locales;
}

export interface Region {
  scanned?: Date;
  scans: number;
  tags: Tag[];
  inStores?: any[];
}

export interface Source {
  id: string;
  src: Sources;
  lc: Locales;
  region: Regions;
  product: SourceProduct;
  status: Status;
  updated: Date;
  date: Date;
}

export interface FavedItem {
  fav: string | null;
  usrFav: string | null;
}

export interface Allergen {
  name: AllergensList;
  value: AllergensValues;
  lc: Locales;
}

export interface Badge {
  value: string;
}

export interface Brand {
  id: string;
  value: string;
  otherNames: any[];
  image: string | null;
  imageBanner: string | null;
}

export interface Image {
  id: string;
  title: string | null;
  quality: number | undefined;
  type: ImageTypes;
  value: string;
  comment: string;
  height: number;
  width: number;
  updated: Date;
  date: Date;
  packShot: boolean;
}

export interface Nutritional {
  nutriscore: Nutriscore | null;
  nutriscorePoints: number | null;
  nutriscoreReported: Nutriscore | null;
  nova?: number | null;
  hint: Hints;
  caloriesKj: number | null;
  caloriesKcal: number | null;
  fat: number | null;
  saturatedFat: number | null;
  glucids: number | null;
  sugar: number | null;
  fiber: number | null;
  proteins: number | null;
  salt: number | null;
}
export interface Url {
  value: string;
}

export interface Category {
  value: any;
  categoryId: string | null;
}

export interface Prices {
  wholePrice: string | null;
  priceUnit: string | null;
  currency: string | null;
  date: Date | null;
}

export interface HazzardStatement {
  code: string;
  description: string;
}

export interface SourceProduct {
  name: string;
  lifeCycle: any;
  additives: [];
  description: string | null;
  manufacturer: {
    value: string | null;
  };
  ingredients: string | null;
  conservation: string | null;
  labelInformation: string | null;
  preparationInstructions: string | null;
  nutritionalClaim: string | null;
  weight: string | null;
  grossWeight: string | null;
  netContent: string | null;
  width: number | null;
  widthUnitOfMeasure: string | null;
  height: number | null;
  heightUnitOfMeasure: string | null;
  piece: string | null;
  consumerUnit: string | null;
  packaging: string | null;
  allergens: Allergen[];
  badges: Badge[];
  brands: Brand[];
  images: Image[];
  mainAttr: string | null;
  productId: number | null;
  url: Url[];
  nutritional: Nutritional;
  productSupport: string | null;
  categories: Category[];
  prices: [Prices];
  flavor: any[];
  origin: string | null;
  hazardStatements: HazzardStatement[];
  ventaCRF: string | null;
}
