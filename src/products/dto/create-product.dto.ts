import { CategoryEntity } from 'src/categories/entities/category.entity'
import { Sizes, Colors } from '../entities/product.entity'
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsArray()
  @IsOptional()
  image?: string[]

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number

  @IsNumber()
  newPrice: number

  @IsNumber()
  oldPrice: number

  @IsEnum(Sizes)
  sizes: Sizes

  @IsEnum(Colors)
  color: Colors

  category: CategoryEntity
}
