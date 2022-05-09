import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/product.entity';
import { Option } from '../option.entity';

export class CreateOptionDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsOptional()
  @ApiProperty()
  image: string;

  @IsOptional()
  @ApiProperty()
  products: Product[];

  @IsOptional()
  @ApiProperty()
  options: Option[];
}
