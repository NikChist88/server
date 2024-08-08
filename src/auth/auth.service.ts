import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { SignUpDto, SignInDto } from './dto'
import { pbkdf2Sync, randomBytes } from 'crypto'
import { UserEntity } from 'src/users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async getAccessToken(email: string) {
    const token = await this.jwtService.signAsync(
      { email },
      { secret: this.configService.get('JWT_SECRET') },
    )
    return token
  }

  private getSalt() {
    return randomBytes(16).toString('hex')
  }

  private getHash(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  }

  private async validateUser(user: UserEntity, password: string) {
    const pwdHash = this.getHash(password, user.salt)

    if (pwdHash !== user.password) {
      throw new HttpException(
        'Wrong email or password!',
        HttpStatus.UNAUTHORIZED,
      )
    }
    
    return this.userService.getUser(user)
  }

  async signUp(dto: SignUpDto) {
    const { username, email, password } = dto
    const salt = this.getSalt()
    const pwdHash = this.getHash(password, salt)
    const token = await this.getAccessToken(email)
    const newUser = { username, email, password: pwdHash, salt, token }
    return await this.userService.create(newUser)
  }

  async signIn(dto: SignInDto) {
    const user = await this.userService.findByEmail(dto.email)
    return this.validateUser(user, dto.password)
  }
}
