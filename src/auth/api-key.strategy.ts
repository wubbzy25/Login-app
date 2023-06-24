import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private authService: AuthService) {
    super(
      {
        header: 'AccessToken',
        prefix: '',
      },
      true,
      (AccessToken, done) => {
        const checkKey = authService.validateApiKey(AccessToken);
        if (!checkKey) {
          return done(false);
        }
        return done(true);
      },
    );
  }
}
