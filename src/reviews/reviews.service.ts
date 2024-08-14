import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ReviewEntity } from './entities/review.entity'
import { Repository } from 'typeorm'
import { CreateReviewDto } from './dto/create-review.dto'

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewsRepo: Repository<ReviewEntity>,
  ) {}

  async create(dto: CreateReviewDto) {
    const newReview = this.reviewsRepo.create(dto)
    return await this.reviewsRepo.save(newReview)
  }

  async findByUserId(userId: string) {
    const reviews = await this.reviewsRepo.find({
      where: { id: userId },
    })

    if (!reviews.length)
      throw new NotFoundException('Reviews for this userId not found!')

    return reviews
  }

  async findAll() {
    return await this.reviewsRepo.find()
  }
}
