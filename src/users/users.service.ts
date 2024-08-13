import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    const createdUser = this.userRepo.create(dto)
    return await this.userRepo.save(createdUser)
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      relations: {
        reviews: true,
        cart: true,
      },
    })

    if (!user)
      throw new HttpException(
        'User on this email not found!',
        HttpStatus.NOT_FOUND,
      )

    return user
  }

  async findById(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: {
        reviews: true,
        cart: true,
      },
    })

    if (!user)
      throw new HttpException(
        'User on this id not found!',
        HttpStatus.NOT_FOUND,
      )

    return user
  }

  async findAll() {
    return await this.userRepo.find({
      relations: {
        reviews: true,
        cart: true,
      },
    })
  }
}
