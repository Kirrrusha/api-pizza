import { Controller, Get } from '@nestjs/common'
import { CategoryService } from '../services/category.service'

import { Category } from '../schemas/category.schema'

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAll(): Promise<Category[]> {
    return this.categoryService.getAll()
  }
}
