import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService
) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        'https://sensei-workout-api.up.railway.app/api/v1/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('done', JSON.stringify(done));
    const userInfo = {
      email: done.emails[0]?.value
    };

    const user = await this.authService.validateGoogleUser(userInfo);
    
    return user;
  }
}
