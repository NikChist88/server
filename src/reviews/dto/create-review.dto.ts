import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  text: string

  @IsString()
  @IsNotEmpty()
  userId: string
}
