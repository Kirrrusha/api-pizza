import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';

@Controller('product')
export class ProductController {
  constructor(private productService = new ProductService()) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createProductDTO: CreateProductCategoryDto,
  ): Promise<Product> {
    return this.productService.createProduct(createProductDTO);
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.productService.deleteProduct(id);
  }

  @Get('/:id')
  getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Patch('/:id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updatePost(id, updateProductDto);
  }
}
