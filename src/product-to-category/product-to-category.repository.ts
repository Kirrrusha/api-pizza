import { ProductToCategory } from './product-to-category.entity';
import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@EntityRepository(ProductToCategory)
export class ProductToCategoryRepository extends Repository<ProductToCategory> {
  async getRecords(): Promise<ProductToCategory[]> {
    const query = this.createQueryBuilder('ProductCategory');

    const products = await query.getMany();
    return products;
  }

  async createRecord(createProducCategorytDto: CreateProductCategoryDto): Promise<ProductToCategory> {
    const { category_id, product_id, category, product } = createProducCategorytDto;

    const productCategory = new ProductToCategory();
    productCategory.category_id = category_id;
    productCategory.product_id = product_id;
    productCategory.category = category;
    productCategory.product = product;

    await productCategory.save();

    return productCategory;
  }

  async removeRecord(product_id: number, category_id: number): Promise<void> {
    const result = await this.delete({ product_id, category_id });

    if (result.affected === 0) {
      throw new NotFoundException(`Records with CATEGORY ID "${category_id}" PRODUCT ID "${product_id}" not found`);
    }
  }

  async removeAllRecordsByProductId(product_id: number) {
    const result = await this.delete({ product_id });

    if (result.affected === 0) {
      throw new NotFoundException(`Records with PRODUCT ID "${product_id}" not found`);
    }
  }

  async removeRecordsByCategoryId(category_id: number): Promise<void> {
    const result = await this.delete({ category_id });

    if (result.affected === 0) {
      throw new NotFoundException(`Records with CATEGORY ID "${category_id}" not found`);
    }
  }

  async getRecordsByCategoryId(category_id: number): Promise<ProductToCategory[]> {
    try {
      const found = await this.find({ where: { category_id } });

      if (!found) {
        throw new NotFoundException(`Records with CATEGORY ID "${category_id}" not found`);
      }

      return found;
    } catch (e) {}
  }

  async getRecord(product_id: number, category_id: number): Promise<ProductToCategory> {
    try {
      const found = await this.findOne({ where: { product_id, category_id } });

      if (!found) {
        throw new NotFoundException(`Records with PRODUCT ID "${product_id}" and CATEGORY ID "${category_id}" not found`);
      }

      return found;
    } catch (e) {}
  }

  async updateRecord(
    product_id: number,
    category_id: number,
    updatePostDto: UpdateProductCategoryDto,
  ): Promise<ProductToCategory> {
    const { product, category, category_id: categoryId, product_id: productId } = updatePostDto;

    const found = await this.findOne({ where: { product_id, category_id } });
    if (product) found.product = product;
    if (category) found.category = category;
    if (categoryId) found.category_id = categoryId;
    if (productId) found.product_id = productId;

    await found.save();

    return found;
  }
}
