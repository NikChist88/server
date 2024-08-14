import { Injectable } from '@nestjs/common'
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

  async addToFavorites(prodId: string, userId: string) {
    const user = this.findById(userId)
    const isExists = (await user).favorites.some((prod) => prod.id === prodId)
    await this.userRepo.find({
      where: {
        id: (await user).id,
      },
      relations: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: {
            id: prodId,
          },
        },
      },
    })

    return true
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
      relations: {
        favorites: true,
        reviews: true,
        orders: true,
      },
    })
  }

  async findById(id: string) {
    return await this.userRepo.findOne({
      where: { id },
      relations: {
        favorites: true,
        reviews: true,
        orders: true,
      },
    })
  }

  async findAll() {
    return await this.userRepo.find({
      relations: {
        favorites: true,
        reviews: true,
        orders: true,
      },
    })
  }
}
