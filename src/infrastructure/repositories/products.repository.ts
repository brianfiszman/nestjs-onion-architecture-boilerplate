import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryCursor } from 'mongoose';
import { ProductCreateDTO } from '../../application/dtos/product/product-create.dto';
import { ProductDocument } from '../../domain/entities';
import { Product } from '../../domain/interfaces';
import { Entities } from '../../domain/enums/entities.enum';

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel(Entities.Product) private readonly productModel: Model<ProductDocument>) {}

  async findOne(ean: string): Promise<Product | null> {
    return await this.productModel.findOne({ ean }).exec();
  }

  async findAll({ skip = 0, limit = 0, query = {} }: any = {}): Promise<Product[]> {
    return await this.productModel.find(query).skip(skip).limit(limit).exec();
  }

  async create(productCreateDTO: ProductCreateDTO): Promise<Product> {
    const product = new this.productModel(productCreateDTO);
    return product.save();
  }

  async update(product: Product): Promise<Product> {
    const ean = product.ean;
    return await this.productModel.updateOne({ ean }, { $set: product });
  }

  async upsert(product: Product): Promise<Product> {
    const ean = product.ean;
    return await this.productModel.updateOne({ ean }, { $set: product }, { upsert: true });
  }

  async getProductsWithCursor({ skip = 0, limit = 0, query = {} }: any = {}): Promise<QueryCursor<ProductDocument>> {
    return this.productModel.find(query).skip(skip).limit(limit).cursor();
  }

  async getProductsCount(): Promise<number> {
    return this.productModel.countDocuments();
  }
}
