import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';

@Module({
  providers: [ProductCategoryService]
})
export class ProductCategoryModule {}
