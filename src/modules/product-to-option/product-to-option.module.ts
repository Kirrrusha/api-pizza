import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ProductToOption,
  ProductToOptionSchema,
} from './schemas/product-to-option.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductToOption.name, schema: ProductToOptionSchema },
    ]),
  ],
})
export class ProductOptionModule {}
