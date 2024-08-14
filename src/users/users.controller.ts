import { UsersService } from './users.service'
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { CurrentUser } from './decorators/user.decorator'
import { JwtAuthGuard } from 'src/auth/guards'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  async getProfile(@CurrentUser('id') id: string) {
    return this.usersService.findById(id)
  }

  @Patch('profile/favorites/:prodId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async addToFavorite(
    @CurrentUser('id') userId: string,
    @Param('prodId') prodId: string,
  ) {
    return this.usersService.addToFavorites(prodId, userId)
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return await this.usersService.findById(id)
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.usersService.findAll()
  }
}
