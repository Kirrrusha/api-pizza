import { IsNotEmpty } from 'class-validator';

import { Option } from '../../option/option.entity';
import { Product } from '../../product/product.entity';

export class CreateProductOptionDto {
  @IsNotEmpty()
  option_id: number;

  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  option: Option;

  @IsNotEmpty()
  product: Product;
}
