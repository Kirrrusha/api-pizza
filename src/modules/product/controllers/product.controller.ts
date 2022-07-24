import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ProductService } from '../services/product.service'
import { Product } from '../schemas/products.schema'
import { Types } from 'mongoose'
import { SaveProductDto } from '../dto/save-product.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this.productService.getAll()
  }

  @Post()
  @UsePipes(ValidationPipe)
  save(@Body() saveProductDTO: SaveProductDto): Promise<Product> {
    return this.productService.save(saveProductDTO)
  }

  // TODO add pipe mongo id
  @Delete('/:id')
  remove(@Param('id') id: Types.ObjectId): Promise<Types.ObjectId> {
    return this.productService.remove(id)
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: string): Promise<Product> {
    return this.productService.getOne(id)
  }
}
