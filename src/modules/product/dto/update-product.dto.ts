import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
}
