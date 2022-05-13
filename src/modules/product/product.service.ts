import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductToCategoryRepository } from '../product-to-category/product-to-category.repository';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { CategoryRepository } from '../category/category.repository';
import { SaveProductDto } from './dto/save-product.dto';
import { Product } from './schemas/products.schema';

@Injectable()
export class ProductService {
  constructor(private productRepo: ProductRepository) {}

  async getAll(): Promise<Product[]> {
    return this.productRepo.getAll();
  }

  async save(product: SaveProductDto): Promise<Product> {
    const productData = await this.productRepo.save(product);

    // if (category_id) {
    //   const categoryData = await this.categoryRepository.getPostById(
    //     category_id,
    //   );

    //   const productToCategory =
    //     await this.productToCategoryRepository.createRecord({
    //       category_id,
    //       product_id: productData.id,
    //       product: productData,
    //       category: categoryData,
    //     });
    //   productData.productToCategory.push(productToCategory);
    // }

    return productData;
  }

  async remove(product_id: string): Promise<string> {
    await this.productRepo.remove(product_id);
    // await this.productToCategoryRepository.removeAllRecordsByProductId(
    //   product_id,
    // );

    return product_id;
  }

  async getOne(id: string): Promise<Product> {
    return this.productRepo.getOne(id);
  }
}
