import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { Product } from '../schemas/products.schema';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  save(@Body() createProductDTO: CreateProductCategoryDto): Promise<void> {
    return this.productService.save(createProductDTO);
  }

  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: string): Promise<string> {
    return this.productService.remove(id);
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: string): Promise<Product> {
    return this.productService.getOne(id);
  }
}
