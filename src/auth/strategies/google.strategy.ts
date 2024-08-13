import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('SERVER_URL') + '/auth/google/callback',
      scope: ['profile', 'email'],
    })
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { emails, photos, displayName } = profile

    const user = {
      email: emails[0].value,
      username: displayName,
      avatar: photos[0].value,
      accessToken: _accessToken,
      refreshToken: _refreshToken,
    }

    done(null, user)
  }
}
