import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductToOptionRepository } from './repo/product-to-option.repository'

import { ProductToOption, ProductToOptionSchema } from './schemas/product-to-option.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductToOption.name, schema: ProductToOptionSchema }])],
  providers: [ProductToOptionRepository],
  exports: [ProductToOptionRepository],
})
export class ProductOptionModule {}
