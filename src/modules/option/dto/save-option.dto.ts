import { IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SaveOptionDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsOptional()
  @ApiProperty()
  image?: string
}
