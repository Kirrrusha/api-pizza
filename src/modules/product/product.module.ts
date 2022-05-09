import { ProductToCategoryRepository } from './../product-to-category/product-to-category.repository';
import { CategoryRepository } from './../category/category.repository';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    ProductToCategoryRepository,
    CategoryRepository,
  ],
})
export class ProductModule {}
