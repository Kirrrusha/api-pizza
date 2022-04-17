import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { ProductToCategoryModule } from 'src/product-to-category/product-to-category.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([ProductRepository]),
      ProductToCategoryModule
    ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
