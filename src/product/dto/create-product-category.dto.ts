import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class CreateProductCategoryDto extends CreateProductDto {
  @IsOptional()
  @ApiProperty()
  category_id: number;
}
