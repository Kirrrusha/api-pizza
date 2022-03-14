import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Option } from '../../option/option.entity';
import { Category } from '../../category/category.entity';

export class UpdateProductDto {
  @IsOptional()
  @ApiProperty()
  title: string;

  @IsOptional()
  @ApiProperty()
  image: string;

  @IsOptional()
  @ApiProperty()
  price: number;

  @IsOptional()
  @ApiProperty()
  description: string;

  @IsOptional()
  @ApiProperty()
  options: Option[];

  @IsOptional()
  @ApiProperty()
  categories: Category[];
}
