import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  price: number;

  description: string;
}
