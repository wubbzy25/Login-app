import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiKeyStrategy } from './api-key.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entities';
import { AuthenticatedMiddleware } from './authenticated.middleware';
import { UsersService } from 'src/users/users.service';
import { CodeGeneratorAccessTokenService } from 'src/code/code-access-token.services';

@Module({
  imports: [PassportModule, ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [
    AuthService,
    ApiKeyStrategy,
    UsersService,
    CodeGeneratorAccessTokenService,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticatedMiddleware).forRoutes('/login', '/register');
    consumer.apply(AuthMiddleware).forRoutes('/gmail');
  }
}
