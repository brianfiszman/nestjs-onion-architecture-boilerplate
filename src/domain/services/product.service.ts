import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from '../schemas';
import { ProductCreateDTO } from '../../application/dtos/product';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>
  ) {}

  async findAll(): Promise<Product[]> {
    const results: Product[] = await this.productModel.find();
    return results;
  }

  async findOne(): Promise<ProductDocument | null> {
    const asda = await this.productModel.findOne({ ean: '1234' }).exec();
    return asda;
  }
}
