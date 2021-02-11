/* eslint-disable @typescript-eslint/no-explicit-any */
import { random, lorem, company, internet, commerce, finance, address, date } from 'faker';
import {
  AllergensListMock,
  Hints,
  ImageTypes,
  Locales,
  Nutriscore,
  Regions,
  Sources,
  Status,
} from '../../src/domain/enums';
import {
  Allergen,
  Badge,
  Brand,
  Image,
  Nutritional,
  Product,
  SourceProduct,
  Url,
  Category,
  Prices,
  HazzardStatement,
  Source,
  Region,
  Tag,
} from '../../src/domain/interfaces';

export const getFakeEan = (): string => {
  const COUNTRY_CODE = finance.amount(100, 999, 0);
  const COMPANY_CODE = finance.amount(10000, 99999, 0);
  const PRODUCT_CODE = finance.amount(1000, 9999, 0);

  function getFakeEanWithControlDigit(ean: string) {
    const _ean = ean.split('').reverse();
    let checksum = 0;
    for (const pos in _ean) {
      checksum += parseInt(_ean[pos]) * (3 - 2 * (parseInt(pos) % 2));
    }
    const CONTROL_DIGIT = (10 - (checksum % 10)) % 10;
    return ean + CONTROL_DIGIT;
  }

  const ean = `${COUNTRY_CODE}${COMPANY_CODE}${PRODUCT_CODE}`;

  return getFakeEanWithControlDigit(ean);
};

export const getFakeTags = ({ region, lc }: any = {}): Tag => ({
  value: random.word(),
  region,
  lc,
});

export const getFakeRegion = ({ region, lc }: any = {}): Region => ({
  scanned: date.soon(),
  scans: random.number(100),
  tags: [...new Array(random.number(5))].map(() => getFakeTags({ region, lc })),
});

export const getFakeNutritionals = (): Nutritional => ({
  nutriscore: Nutriscore.A,
  nutriscorePoints: random.number(50),
  nutriscoreReported: Nutriscore.A,
  hint: Hints.ok,
  caloriesKj: random.number(10),
  caloriesKcal: random.number(10),
  fat: random.number(10),
  saturatedFat: random.number(10),
  glucids: random.number(10),
  sugar: random.number(10),
  fiber: random.number(10),
  proteins: random.number(10),
  salt: random.number(10),
});

export const getFakeAllergens = (): Allergen[] => AllergensListMock;

export const getFakeBadges = (): Badge[] => {
  return [...new Array(random.number(3))].map(() => ({ value: random.word() }));
};

export const getFakeBrands = (): Brand[] => {
  return [...new Array(random.number(3))].map(() => ({
    id: random.uuid(),
    value: company.companyName(),
    otherNames: [company.companyName()],
    image: random.image(),
    imageBanner: random.image(),
  }));
};

export const getFakeImages = (): Image[] => {
  return [...new Array(random.number(3))].map(() => ({
    id: random.uuid(),
    title: random.words(),
    quality: random.number(),
    type: ImageTypes.front,
    value: random.word(),
    comment: lorem.word(),
    height: random.number(),
    width: random.number(),
    updated: new Date(),
    date: new Date(),
    packShot: random.boolean(),
  }));
};

export const getFakeUrl = (): Url[] => [...new Array(random.number(3))].map(() => ({ value: internet.url() }));

export const getFakeCategories = (): Category[] => {
  return [...new Array(random.number(3))].map(() => ({
    value: random.word(),
    categoryId: random.uuid(),
  }));
};

export const getFakePrices = (): [Prices] => [
  {
    wholePrice: finance.amount().toString(),
    priceUnit: finance.amount().toString(),
    currency: finance.currencyName(),
    date: new Date(),
  },
];

export const getFakeHazzards = (): HazzardStatement[] => {
  return [...new Array(random.number(3))].map(() => ({
    code: random.number().toString(),
    description: lorem.text(),
  }));
};

export const getFakeSourceProduct = (options = {}): SourceProduct => ({
  name: commerce.product(),
  lifeCycle: {
    status: null,
    firstAvailabilityDate: null,
  },
  additives: [],
  description: commerce.productDescription(),
  manufacturer: {
    value: company.companyName(),
  },
  ingredients: lorem.text(2),
  conservation: lorem.text(2),
  labelInformation: lorem.text(2),
  preparationInstructions: lorem.text(2),
  nutritionalClaim: lorem.text(2),
  weight: lorem.text(2),
  grossWeight: lorem.text(2),
  netContent: lorem.text(2),
  width: random.number(),
  widthUnitOfMeasure: random.word(),
  height: random.number(),
  heightUnitOfMeasure: random.word(),
  piece: random.word(),
  consumerUnit: random.word(),
  packaging: random.word(),
  allergens: getFakeAllergens(),
  badges: getFakeBadges(),
  brands: getFakeBrands(),
  images: getFakeImages(),
  mainAttr: random.word(),
  productId: random.number(),
  url: getFakeUrl(),
  nutritional: getFakeNutritionals(),
  productSupport: random.word(),
  categories: getFakeCategories(),
  prices: getFakePrices(),
  flavor: [],
  origin: address.county(),
  hazardStatements: getFakeHazzards(),
  ventaCRF: random.word(),
  ...options,
});

export const getFakeSource = ({ options, productOptions }: any = {}): Source => ({
  id: random.uuid(),
  src: Sources.ALKEMICS,
  lc: Locales.FR,
  region: Regions.FR,
  product: getFakeSourceProduct(productOptions),
  status: Status.DEFAULT,
  updated: new Date(),
  date: new Date(),
  ...options,
});

export const getFakeProduct = ({
  region = Regions.DEFAULT,
  lc = Locales.FR,
  productProps,
  sourceProps,
  sourceProductProps,
}: any = {}): Product => ({
  _id: random.uuid(),
  ean: getFakeEan(),
  status: Status.active,
  defaultLc: Locales.FR,
  region: {
    [region]: getFakeRegion({ region, lc }),
  },
  score: random.number(110),
  source: [
    getFakeSource({
      options: sourceProps,
      productOptions: sourceProductProps,
    }),
  ],
  _schema: 2,
  updated: new Date(),
  ...productProps,
});

export const getFakeProductsArray = (length?: number): Product[] => {
  return [...new Array(length || random.number(10))].map(() => getFakeProduct());
};
