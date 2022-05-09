import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SaveProductDto } from './save-product.dto';

export class CreateProductCategoryDto extends SaveProductDto {
  @IsOptional()
  @ApiProperty()
  category_id?: number;
}
