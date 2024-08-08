import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from 'src/configs'
import { UsersModule } from 'src/users/users.module'
import { CookieService } from './cookie.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CookieService],
  exports: [AuthService],
})
export class AuthModule {}
