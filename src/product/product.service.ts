import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { ProductToCategoryRepository } from 'src/product-to-category/product-to-category.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { CategoryRepository } from 'src/category/category.repository';

@Injectable()
export class ProductService {
  constructor(
      private productRepo = new ProductRepository(),
      private productToCategoryRepository = new ProductToCategoryRepository(),
      private categoryRepository = new CategoryRepository(),
    ) {}

  async getProducts(): Promise<Product[]> {
    return this.productRepo.getProducts();
  }

  async createProduct({category_id, ...product}: CreateProductCategoryDto): Promise<Product> {
    const productData = await this.productRepo.createProduct(product)
    const categoryData = await this.categoryRepository.getPostById(category_id)

    await this.productToCategoryRepository.createRecord({category_id, product_id: productData.id, product: productData, category: categoryData})
    return productData;
  }

  async deleteProduct(product_id: number): Promise<number> {
    await this.productRepo.deleteProduct(product_id);
    await this.productToCategoryRepository.removeAllRecordsByProductId(product_id)

    return product_id
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepo.getProductById(id);
  }

  async updatePost(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productRepo.updateProduct(id, updateProductDto);
  }
}
