import { Module } from '@nestjs/common';
import { CodeGeneratorService } from './code-generator.services';
import { CodeGeneratorAccessTokenService } from './code-access-token.services';
import { CodeValidateService } from './code-validate.service';
import { User } from 'src/users/entities/user.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    CodeGeneratorService,
    CodeGeneratorAccessTokenService,
    CodeValidateService,
  ],
})
export class CodeModule {}
