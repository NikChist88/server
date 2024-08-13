import { AuthService } from './auth.service'
import { AuthDto } from './dto'
import { CookieService } from './cookie.service'
import { Request, Response } from 'express'
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { GoogleOAuthGuard } from './guards'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ClassSerializerInterceptor)
  async signUp(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signUp(dto)
    this.cookieService.setToken(res, user.refreshToken)
    return user
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  async signIn(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signIn(dto)
    this.cookieService.setToken(res, user.refreshToken)
    return user
  }

  @Post('signin/access-token')
  @HttpCode(HttpStatus.OK)
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = this.cookieService.getToken(req)
    if (!refreshToken) {
      this.cookieService.removeToken(res)
      throw new UnauthorizedException('Refresh token not found!')
    }

    return this.authService.getNewTokens(refreshToken)
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res)
    return { message: 'You are exit!' }
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.validateOAuthLogin(req)

    this.cookieService.setToken(res, refreshToken)

    return res.redirect(
      `http://localhost:3000/dashboard?accessToken=${accessToken}`,
    )
  }
}
