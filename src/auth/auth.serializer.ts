import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { UserEntity } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super()
  }

  serializeUser(user: UserEntity, done: Function) {
    done(null, user)
  }

  async deserializeUser(payload: UserEntity, done: Function) {
    const user = await this.userService.findByEmail(payload.email)
    return user ? done(null, user) : done(null, null)
  }
}
