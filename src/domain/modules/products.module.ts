import { Module } from '@nestjs/common';
import { OrmModule } from '../../infrastructure/database/orm';
import { ProductsRepository } from '../../infrastructure/repositories';
import { ProductSchema } from '../entities';
import { Entities } from '../enums/entities.enum';
import { ProductsService } from '../services/products.service';

@Module({
  imports: [OrmModule.forFeature([{ name: Entities.Product, schema: ProductSchema }])],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
