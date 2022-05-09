import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async getProducts(): Promise<Category[]> {
    const query = this.createQueryBuilder('Category');

    const list = await query.getMany();
    return list;
  }

  async createCategory(createProductDto: CreateCategoryDto): Promise<Category> {
    const { title } = createProductDto;

    const category = new Category();
    category.title = title;
    await category.save();

    return category;
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async getPostById(id: number): Promise<Category> {
    try {
      const found = await this.findOne({ where: { id } });

      if (!found) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }

      return found;
    } catch (e) {}
  }

  async updateCategory(
    id: number,
    updatePostDto: UpdateCategoryDto,
  ): Promise<Category> {
    const { title } = updatePostDto;

    const found = await this.findOne({ where: { id } });
    if (title) found.title = title;

    await found.save();

    return found;
  }
}
