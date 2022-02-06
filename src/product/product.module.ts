import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductService, ProductController],
})
export class ProductModule {}
