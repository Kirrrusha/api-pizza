import { IsOptional } from 'class-validator';
import { Category } from 'src/category/category.entity';
import { Product } from 'src/product/product.entity';

export class UpdateProductCategoryDto {
  @IsOptional()
  category_id: number;

  @IsOptional()
  category: Category;

  @IsOptional()
  product: Product;
}
