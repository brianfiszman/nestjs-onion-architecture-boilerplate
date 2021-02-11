import { Injectable, Logger } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { ProductCreateDTO } from '../../application/dtos/product';
import { ProductDocument } from '../entities';
import { Product } from '../interfaces';
import { ProductsRepository } from './../../infrastructure/repositories/products.repository';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getOneProduct(ean: string): Promise<Product | null> {
    return await this.productsRepository.findOne(ean);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productsRepository.findAll();
  }

  async getProductsByQuery(options: FilterQuery<ProductDocument> = {}): Promise<Product[]> {
    return await this.productsRepository.findAll(options);
  }

  async createProduct(product: ProductCreateDTO): Promise<Product> {
    return await this.productsRepository.create(product);
  }

  async updateProduct(product: Product, upsert = false): Promise<Product> {
    return upsert ? await this.productsRepository.upsert(product) : await this.productsRepository.update(product);
  }
}
