import { IsNotEmpty, IsOptional } from 'class-validator';

import { Option } from '../../option/option.entity';
import { Product } from '../../product/product.entity';

export class UpdateProductOptionDto {
  @IsOptional()
  option_id: number;

  @IsOptional()
  product_id: number;

  @IsOptional()
  option: Option;

  @IsOptional()
  product: Product;
}
