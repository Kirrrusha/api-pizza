import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/product.entity';

export class UpdateCategoryDto {
  @IsOptional()
  @ApiProperty()
  title: string;

  @IsOptional()
  @ApiProperty()
  products: Product[];
}
