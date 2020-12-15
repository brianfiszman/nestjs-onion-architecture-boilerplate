import { Module } from '@nestjs/common';
import { ProductController } from '../../application/controllers';
import { ProductService } from '../services';
import { Product, ProductSchema } from '../schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
