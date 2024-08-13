import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request, Response } from 'express'

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}
  
  static tokenKey = 'refreshToken'

  getToken(req: Request) {
    return req.cookies[CookieService.tokenKey]
  }

  setToken(res: Response, refreshToken: string) {
    res.cookie(CookieService.tokenKey, refreshToken, {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'none',
    })
  }

  removeToken(res: Response) {
    res.clearCookie(CookieService.tokenKey)
  }
}
