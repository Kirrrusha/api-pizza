import { IsEmail, IsString, IsNotEmpty, Matches, IsEnum, MinLength, MaxLength } from 'class-validator'
import { RoleEnum } from '../enums/role.enum'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  username: string

  @IsEnum(RoleEnum)
  role: RoleEnum.admin | RoleEnum.user

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/, { message: 'Weak password' })
  password: string

  // @IsString()
  // @ApiProperty({ default: '5ccca18c-2716-4b2d-99fb-7f0d38816052' })
  // fingerprint: string
}
