import { Module } from '@nestjs/common'
import { CategoryService } from './services/category.service'
import { CategoryController } from './controllers/category.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Category, CategorySchema } from './schemas/category.schema'
import { CategoryRepository } from './repo/category.repository'
import { ProductToCategoryModule } from '../product-to-category/product-to-category.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]), ProductToCategoryModule],
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
})
export class CategoryModule {}
