import { Module } from '@nestjs/common';
import { UsersController, GmailController } from './users.controller';
import { EmailService } from './gmail.service';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { CodeGeneratorService } from 'src/code/code-generator.services';
import { CodeGeneratorAccessTokenService } from 'src/code/code-access-token.services';
import { CodeValidateService } from 'src/code/code-validate.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UsersController, GmailController],
  providers: [
    UsersService,
    EmailService,
    CodeGeneratorService,
    CodeGeneratorAccessTokenService,
    CodeValidateService,
  ],
})
export class UsersModule {}
