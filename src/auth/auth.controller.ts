import { AuthService } from './auth.service'
import { SignUpDto, SignInDto, GetSessionInfoDto } from './dto'
import { CookieService } from './cookie.service'
import { Response } from 'express'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from './guards/auth.guard'
import { SessionInfo } from './decorators/session.decorator'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signUp(dto)
    this.cookieService.setToken(res, user.token)
    return user
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signIn(dto)
    this.cookieService.setToken(res, user.token)
    return user
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res)
    return { message: 'You are exit!' }
  }

  @Get('session')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getSession(@SessionInfo() session: GetSessionInfoDto) {
    return session
  }
}
