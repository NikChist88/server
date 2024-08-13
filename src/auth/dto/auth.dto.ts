import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator'

export class AuthDto {
  @IsString()
  @IsOptional()
  username?: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @MinLength(6, { message: 'Password must be at least 6 characters long!' })
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password must contain at least one number!',
  })
  @IsOptional()
  password?: string

  @IsString()
  @IsOptional()
  salt?: string
}
