import { ProductToOption } from './product-to-option.entity';
import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateProductOptionDto } from './dto/create-product-option.dto';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';

@EntityRepository(ProductToOption)
export class ProductToOptionRepository extends Repository<ProductToOption> {
  async getProductOprions(): Promise<ProductToOption[]> {
    const query = this.createQueryBuilder('ProductOption');

    const products = await query.getMany();
    return products;
  }

  async createRecord(createProducOptionDto: CreateProductOptionDto): Promise<ProductToOption> {
    const { option_id, product_id, option, product } = createProducOptionDto;

    const productCategory = new ProductToOption();
    productCategory.option_id = option_id;
    productCategory.product_id = product_id;
    productCategory.option = option;
    productCategory.product = product;

    await productCategory.save();

    return productCategory;
  }

  async deleteRecord(option_id: number): Promise<void> {
    const result = await this.delete({ option_id });

    if (result.affected === 0) {
      throw new NotFoundException(`Records with OPTION ID "${option_id}" not found`);
    }
  }

  async getRecordsByOptionId(option_id: number): Promise<ProductToOption[]> {
    try {
      const found = await this.find({ where: { option_id } });

      if (!found) {
        throw new NotFoundException(`Records with OPTION ID "${option_id}" not found`);
      }

      return found;
    } catch (e) {}
  }

  async getRecordsByProductId(product_id: number): Promise<ProductToOption[]> {
    try {
      const found = await this.find({ where: { product_id } });

      if (!found) {
        throw new NotFoundException(`Records with PRODUCT ID "${product_id}" not found`);
      }

      return found;
    } catch (e) {}
  }

  async updateProductCategory(
    product_id: number,
    option_id: number,
    updatePostDto: UpdateProductOptionDto,
  ): Promise<ProductToOption> {
    const { product, option, product_id: productId, option_id: optionId} = updatePostDto;

    const found = await this.findOne({ where: { product_id, option_id } });
    if (product) found.product = product;
    if (option) found.option = option;
    if (productId) found.option_id = productId;
    if (optionId) found.product_id = optionId;

    await found.save();

    return found;
  }
}
