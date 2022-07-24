import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CategoryService } from '../services/category.service'
import { Category } from '../schemas/category.schema'
import { SaveCategoryDto } from '../dto/save-category.dto'
import { Types } from 'mongoose'

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAll(): Promise<Category[]> {
    return this.categoryService.getAll()
  }

  @Post()
  @UsePipes(ValidationPipe)
  save(@Body() saveProductDTO: SaveCategoryDto): Promise<Category> {
    return this.categoryService.save(saveProductDTO)
  }

  // TODO add pipe mongo id
  @Delete('/:id')
  remove(@Param('id') id: Types.ObjectId): Promise<Types.ObjectId> {
    return this.categoryService.remove(id)
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: string): Promise<Category> {
    return this.categoryService.getOne(id)
  }
}
