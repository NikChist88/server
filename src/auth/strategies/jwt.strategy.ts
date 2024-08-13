import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    const extractJwtFromCookie = (req) => {
      let token = null
      if (req && req.cookies) {
        token = req.cookies['access_token']
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req)
    }

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate(userId: string) {
    const user = await this.usersService.findById(userId)
    if (!user) throw new UnauthorizedException('Please log in to continue')

    return user
  }
}
