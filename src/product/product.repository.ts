import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getProducts(): Promise<Product[]> {
    const query = this.createQueryBuilder('Product');

    const products = await query.getMany();
    return products;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { title, description, price, options, image } = createProductDto;

    const product = new Product();
    product.title = title;
    product.description = description;
    product.price = price;
    if (image) product.image = image;
    if (options) product.options = options;
    await product.save();

    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const found = await this.findOne({ where: { id } });

      if (!found) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }

      return found;
    } catch (e) {}
  }

  async updateProduct(
    id: number,
    updatePostDto: UpdateProductDto,
  ): Promise<Product> {
    const { title, description, price, options, image } = updatePostDto;

    const found = await this.findOne({ where: { id } });
    if (title) found.title = title;
    if (description) found.description = description;
    if (price) found.price = price;
    if (options) found.options = options;
    if (image) found.image = image;

    await found.save();

    return found;
  }
}
