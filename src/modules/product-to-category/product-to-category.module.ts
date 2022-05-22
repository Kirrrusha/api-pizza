import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductToCategoryRepository } from './repo/product-to-category.repository';

import {
  ProductToCategory,
  ProductToCategorySchema,
} from './schemas/product-to-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductToCategory.name, schema: ProductToCategorySchema },
    ]),
  ],
  providers: [ProductToCategoryRepository],
})
export class ProductToCategoryModule {}
