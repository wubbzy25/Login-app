import { Injectable } from '@nestjs/common/decorators';
import { User } from '../users/entities/user.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';

@Injectable()
export class CodeValidateService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async ValidateCode(code: string) {
    const user = await this.userRepository.findOne({
      where: {
        ResetPasswordCode: code,
      },
    });
    if (user) {
      if (user.ResetPasswordCode === code) {
        user.ResetPassword = true;
        await this.userRepository.save(user);
        throw new HttpException('Code validation Correct', 200);
      }
    }
    throw new HttpException('Code validation Incorrect', 400);
  }
}
