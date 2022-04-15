import { ProductCategory } from './productCategory.entity';
import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends Repository<ProductCategory> {
  async getProductCategory(): Promise<ProductCategory[]> {
    const query = this.createQueryBuilder('Product');

    const products = await query.getMany();
    return products;
  }

  async createProductCategory(createProducCategorytDto: CreateProductCategoryDto): Promise<ProductCategory> {
    const { category_id, product_id, category, product } = createProducCategorytDto;

    const productCategory = new ProductCategory();
    productCategory.category_id = category_id;
    productCategory.product_id = product_id;
    productCategory.category = category;
    productCategory.product = product;

    await productCategory.save();

    return productCategory;
  }

  async deleteProductCategory(category_id: number): Promise<void> {
    const result = await this.delete({ category_id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with CATEGORY ID "${category_id}" not found`);
    }
  }

  async getProductCategoryById(id: number): Promise<ProductCategory> {
    try {
      const found = await this.findOne({ where: { id } });

      if (!found) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }

      return found;
    } catch (e) {}
  }

  async updateProductCategory(
    product_id: number,
    updatePostDto: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    const { product, category, category_id } = updatePostDto;

    const found = await this.findOne({ where: { product_id } });
    if (product) found.product = product;
    if (category) found.category = category;
    if (category_id) found.category_id = category_id;

    await found.save();

    return found;
  }
}
