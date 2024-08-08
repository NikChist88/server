import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email })
    if (user)
      throw new HttpException(
        'User by this email already exist!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )

    const createdUser = this.userRepository.create(dto)
    return await this.userRepository.save(createdUser)
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email })
    if (!user)
      throw new HttpException(
        'User on this email not found!',
        HttpStatus.NOT_FOUND,
      )

    return user
  }

  async findById(id: string) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user)
      throw new HttpException(
        'User on this id not found!',
        HttpStatus.NOT_FOUND,
      )

    return this.getUser(user)
  }

  getUser(user: UserEntity) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      token: user.token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      products: user.products,
    }
  }
}
