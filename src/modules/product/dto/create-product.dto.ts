import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsOptional()
  @ApiProperty()
  image?: string;

  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsOptional()
  @ApiProperty()
  description?: string;
}
