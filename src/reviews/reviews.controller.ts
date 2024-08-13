import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './dto/create-review.dto'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewsService.create(dto)
  }

  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  async findByUserId(@Param('userId') userId: string) {
    return this.reviewsService.findByUserId(userId)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.reviewsService.findAll()
  }
}
