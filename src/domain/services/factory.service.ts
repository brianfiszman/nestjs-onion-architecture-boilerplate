import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AllergensList, AllergensValues, Hints, Locales, Regions, Sources, Status } from '../enums/';
import { Allergen, Nutritional, Product, Source, SourceProduct } from '../interfaces/';

@Injectable()
export class FactoryService {
  createInitialProduct = (ean: string, { name = 'Produit sans nom', status = Status.DEFAULT }: any = {}): Product => ({
    ean,
    status,
    defaultLc: Locales.FR,
    region: {
      FR: {
        scans: 0,
        tags: [],
        inStores: [],
      },
    },
    score: 0,
    source: [this.createSource(name)],
    _schema: 2,
    updated: new Date(),
  });

  createSource = (name: string): Source => ({
    id: uuid(),
    src: Sources.ALKEMICS,
    lc: Locales.FR,
    region: Regions.FR,
    product: this.createProductSource(name),
    status: Status.DEFAULT,
    updated: new Date(),
    date: new Date(),
  });

  createProductSource = (name: string): SourceProduct => ({
    name,
    lifeCycle: {
      status: null,
      firstAvailabilityDate: null,
    },
    additives: [],
    description: null,
    manufacturer: {
      value: null,
    },
    ingredients: null,
    conservation: null,
    labelInformation: null,
    preparationInstructions: null,
    nutritionalClaim: null,
    weight: null,
    grossWeight: null,
    netContent: null,
    width: null,
    widthUnitOfMeasure: null,
    height: null,
    heightUnitOfMeasure: null,
    piece: null,
    consumerUnit: null,
    packaging: null,
    allergens: this.createAllergens(),
    badges: [],
    brands: [],
    images: [],
    mainAttr: null,
    productId: null,
    url: [],
    nutritional: this.createNutritionals(),
    productSupport: null,
    categories: [],
    prices: [
      {
        wholePrice: null,
        priceUnit: null,
        currency: null,
        date: null,
      },
    ],
    flavor: [],
    origin: null,
    hazardStatements: [],
    ventaCRF: null,
  });

  createAllergens = (): Allergen[] =>
    Object.values(AllergensList).map(a => ({ name: a, value: AllergensValues['n/a'], lc: Locales.EN }));

  createNutritionals = (): Nutritional => ({
    hint: Hints.no,
    nutriscore: null,
    nutriscorePoints: 0,
    nutriscoreReported: null,
    nova: null,
    caloriesKcal: null,
    caloriesKj: null,
    fat: null,
    saturatedFat: null,
    sugar: null,
    proteins: null,
    fiber: null,
    salt: null,
    glucids: null,
  });
}
