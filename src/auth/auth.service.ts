import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { AuthDto } from './dto'
import { pbkdf2Sync, randomBytes } from 'crypto'
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  private getSalt() {
    return randomBytes(16).toString('hex')
  }

  private getHash(password: string, salt: string) {
    return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  }

  private getTokens(userId: string) {
    const data = { id: userId }

    const accessToken = this.jwtService.sign(data, {
      expiresIn: '1h',
    })

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: '7d',
    })

    return { accessToken, refreshToken }
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwtService.verifyAsync(refreshToken)
    if (!result) throw new UnauthorizedException('Token not valid!')

    const user = await this.userService.findById(result.id)
    const tokens = this.getTokens(user.id)

    return { ...user, ...tokens }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.findByEmail(dto.email)
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND)

    const pwdHash = this.getHash(dto.password, user.salt)
    if (pwdHash !== user.password) {
      throw new HttpException(
        'Wrong email or password!',
        HttpStatus.UNAUTHORIZED,
      )
    }

    return user
  }

  async validateOAuthLogin(req: any) {
    let user = await this.userService.findByEmail(req.user.email)

    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        username: req.user.username,
      })
    }

    const tokens = this.getTokens(user.id)
    return { user, ...tokens }
  }

  async signUp(dto: AuthDto) {
    const { username, email, password } = dto

    const existingUser = await this.userService.findByEmail(email)
    if (existingUser)
      throw new HttpException(
        'User by this email already exist!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )

    const salt = this.getSalt()
    const pwdHash = this.getHash(password, salt)
    const newUser = { username, email, password: pwdHash, salt }
    const user = await this.userService.create(newUser)
    const tokens = this.getTokens(user.id)

    return { user, ...tokens }
  }

  async signIn(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const tokens = this.getTokens(user.id)

    return { user, ...tokens }
  }
}
