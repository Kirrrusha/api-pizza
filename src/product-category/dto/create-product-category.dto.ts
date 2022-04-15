import { IsNotEmpty } from 'class-validator';
import { Category } from 'src/category/category.entity';
import { Product } from 'src/product/product.entity';

export class CreateProductCategoryDto {
  @IsNotEmpty()
  category_id: number;

  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  product: Product;
}
