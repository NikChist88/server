import { UsersService } from './users.service'
import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: string) {
    return this.usersService.findById(id)
  }
}
