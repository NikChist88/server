import { IsEmail, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsOptional()
  username?: string

  @IsString()
  @IsEmail()
  email: string

  @IsOptional()
  password?: string

  @IsString()
  @IsOptional()
  salt?: string
}
