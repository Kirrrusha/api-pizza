import { Injectable } from '@nestjs/common'
import { Types } from 'mongoose'

import { ProductToCategoryRepository } from './../../product-to-category/repo/product-to-category.repository'
import { SaveCategoryDto } from '../dto/save-category.dto'
import { CategoryRepository } from '../repo/category.repository'
import { Category } from '../schemas/category.schema'

@Injectable()
export class CategoryService {
  constructor(private categoryRepo: CategoryRepository, private productToCategoryRepository: ProductToCategoryRepository) {}

  async getAll(): Promise<Category[]> {
    return this.categoryRepo.getAll()
  }

  async save(payload: SaveCategoryDto): Promise<Category> {
    const result = await this.categoryRepo.save(payload)

    if (payload.productIds.length) {
      await this.productToCategoryRepository.saveMany(payload.productIds?.map((productId) => ({ productId, categoryId: result['_id'] })))
    }

    return result
  }

  async remove(categoryId: Types.ObjectId): Promise<Types.ObjectId> {
    await this.categoryRepo.remove(categoryId)
    await this.productToCategoryRepository.remove({ categoryId })

    return categoryId
  }

  async getOne(title: string): Promise<Category> {
    return this.categoryRepo.getOneByTitle(title)
  }
}
