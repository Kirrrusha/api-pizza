import { CategoryModule } from './../category/category.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductService } from './services/product.service'
import { ProductController } from './controllers/product.controller'
import { ProductRepository } from './repo/product.repository'
import { Product, ProductSchema } from './schemas/products.schema'
import { ProductToCategoryModule } from '../product-to-category/product-to-category.module'
import { ProductOptionModule } from '../product-to-option/product-to-option.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ProductToCategoryModule,
    CategoryModule,
    ProductOptionModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
