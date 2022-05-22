import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class SaveProductCategoryDto {
  @IsOptional()
  @Type(() => Types.ObjectId)
  productId?: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  categoryId?: Types.ObjectId;
}
