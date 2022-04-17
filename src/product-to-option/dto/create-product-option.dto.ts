import { IsNotEmpty } from 'class-validator';

import { Option } from 'src/option/option.entity';
import { Product } from 'src/product/product.entity';

export class CreateProductOptionDto {
    @IsNotEmpty()
    option_id: number

    @IsNotEmpty()
    product_id: number

    @IsNotEmpty()
    option: Option

    @IsNotEmpty()
    product: Product
}