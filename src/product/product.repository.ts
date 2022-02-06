import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getProducts(): Promise<Product[]> {
    const query = this.createQueryBuilder('Product');

    const products = await query.getMany();
    return products;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { title, description, price } = createProductDto;

    const product = new Product();
    product.title = title;
    product.description = description;
    product.price = price;
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
    const found = await this.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async updateProduct(
    id: number,
    updatePostDto: CreateProductDto,
  ): Promise<Product> {
    const { title, description } = updatePostDto;

    const found = await this.findOne({ where: { id } });
    found.title = title;
    found.description = description;
    await found.save();

    return found;
  }
}
