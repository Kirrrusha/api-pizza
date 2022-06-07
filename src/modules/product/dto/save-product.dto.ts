import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
export class SaveProductDto {
  @IsOptional()
  @ApiProperty()
  id?: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsOptional()
  @ApiProperty()
  image?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  price: number;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  @ApiProperty()
  description?: string;

  @IsOptional()
  @Type(() => Types.ObjectId)
  categoryIds?: Types.ObjectId[];
}
