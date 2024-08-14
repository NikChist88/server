import { IsNotEmpty, IsString } from 'class-validator'

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  text: string

  @IsString()
  @IsNotEmpty()
  userId: string
}
