import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/product.entity';

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsOptional()
  @ApiProperty()
  products: Product[];
}
