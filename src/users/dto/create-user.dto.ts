import { IsEmail, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  username: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  salt: string

  @IsString()
  token: string
}
