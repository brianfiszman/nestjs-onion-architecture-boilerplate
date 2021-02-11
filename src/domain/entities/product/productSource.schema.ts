import * as mongoose from 'mongoose';
import { AllergenSchema } from './allergen.schema';
import { BrandSchema } from './brand.schema';
import { CategorySchema } from './category.schema';
import { ImageSchema } from './image.schema';
import { LifeCycleSchema } from './lifeCycle.schema';
import { NutritionalSchema } from './nutritional.schema';

export const ProductSourceSchema = new mongoose.Schema(
  {
    name: String,
    lifeCycle: {
      type: LifeCycleSchema,
      default: {},
    },
    additives: {
      type: Array,
      default: [],
    },
    description: { type: String, default: null },
    manufacturer: {
      _id: false,
      value: { type: String, default: null },
    },
    ingredients: { type: String, default: null },
    conservation: { type: String, default: null },
    labelInformation: { type: String, default: null },
    preparationInstructions: { type: String, default: null },
    nutritionalClaim: { type: String, default: null },
    weight: { type: String, default: null },
    grossWeight: { type: String, default: null },
    netContent: { type: String, default: null },
    width: Number,
    widthUnitOfMeasure: { type: String, default: null },
    height: Number,
    heightUnitOfMeasure: { type: String, default: null },
    piece: { type: String, default: null },
    consumerUnit: { type: String, default: null },
    packaging: { type: String, default: null },
    allergens: {
      type: [AllergenSchema],
      default: [],
    },
    badges: [{ _id: false, value: String }],
    brands: [BrandSchema],
    images: [ImageSchema],
    mainAttr: { type: String, default: null },
    productId: Number,
    url: [{ _id: false, value: String }],
    nutritional: {
      type: NutritionalSchema,
      default: {},
    },
    productSupport: { type: String, default: null },
    categories: [CategorySchema],
    prices: [{ _id: false, wholePrice: String, priceUnit: String, currency: String, date: Date }],
    flavor: Array,
    origin: { type: String, default: null },
    hazardStatements: [{ code: String, description: String }],
    ventaCRF: { type: String, default: null },
  },
  {
    _id: false,
    id: false,
    timestamps: false,
  }
);
