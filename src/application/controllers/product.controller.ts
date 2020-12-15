import { ProductDocument } from '../../domain/schemas/product.schema';
import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../../domain/services';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService, @InjectConnection() private readonly connection: Connection) {}

  @Get()
  async findOne(): Promise<ProductDocument | null> {
    const results = await this.productService.findOne();
    return results;
  }

  @Get('/health')
  async healthCheck(): Promise<number | void> {
    console.log(await this.connection.readyState);
  }
}
