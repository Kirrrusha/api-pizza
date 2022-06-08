import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class SaveProductToOptionDto {
  @IsOptional()
  @Type(() => Types.ObjectId)
  productId?: Types.ObjectId;

  @IsOptional()
  @Type(() => Types.ObjectId)
  optionId?: Types.ObjectId;
}
