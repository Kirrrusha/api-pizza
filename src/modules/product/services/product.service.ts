import { Injectable } from '@nestjs/common'
import { Types } from 'mongoose'

import { ProductRepository } from '../repo/product.repository'
import { ProductToCategoryRepository } from '../../product-to-category/repo/product-to-category.repository'
import { ProductToOptionRepository } from '../../product-to-option/repo/product-to-option.repository'
import { SaveProductDto } from '../dto/save-product.dto'
import { Product } from '../schemas/products.schema'

@Injectable()
export class ProductService {
  constructor(
    private productRepo: ProductRepository,
    private productToCategoryRepository: ProductToCategoryRepository,
    private productToOptionRepository: ProductToOptionRepository
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productRepo.getAll()
  }

  async save(payload: SaveProductDto): Promise<Product> {
    const productData = await this.productRepo.save(payload)

    if (payload.categoryIds?.length) {
      await this.productToCategoryRepository.saveMany(
        payload.categoryIds?.map((categoryId) => ({
          categoryId,
          productId: productData['_id']
        }))
      )
    }

    if (payload.optionIds?.length) {
      await this.productToOptionRepository.saveMany(
        payload.optionIds?.map((optionId) => ({
          optionId,
          productId: productData['_id']
        }))
      )
    }

    return productData
  }

  async remove(productId: Types.ObjectId): Promise<Types.ObjectId> {
    await this.productRepo.remove(productId)
    await this.productToCategoryRepository.remove({ productId })

    return productId
  }

  async getOne(title: string): Promise<Product> {
    return this.productRepo.getOneByTitle(title)
  }
}
