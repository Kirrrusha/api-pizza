import { IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { Types } from 'mongoose'

export class SaveCategoryDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsOptional()
  @Type(() => Types.ObjectId)
  productIds?: Types.ObjectId[]
}
