import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { CookieService } from '../cookie.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as Request
    const token = req.cookies[CookieService.tokenKey]

    if (!token) throw new UnauthorizedException('Access token not found!')

    try {
      const sessionInfo = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      })

      req['session'] = sessionInfo
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }
}
