import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { ProductRepository } from '../repo/product.repository';
import { ProductToCategoryRepository } from '../../product-to-category/repo/product-to-category.repository';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { CategoryRepository } from '../../category/category.repository';
import { SaveProductDto } from '../dto/save-product.dto';
import { Product } from '../schemas/products.schema';

@Injectable()
export class ProductService {
  constructor(
    private productRepo: ProductRepository,
    private productToCategoryRepository: ProductToCategoryRepository,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productRepo.getAll();
  }

  async save(payload: SaveProductDto): Promise<Product> {
    const productData = await this.productRepo.save(payload);
    return productData;
  }

  async remove(productId: Types.ObjectId): Promise<Types.ObjectId> {
    await this.productRepo.remove(productId);
    await this.productToCategoryRepository.remove({ productId });

    return productId;
  }

  async getOne(title: string): Promise<Product> {
    return this.productRepo.getOneByTitle(title);
  }
}
