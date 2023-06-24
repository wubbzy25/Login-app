import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  // Registro
  private readonly apiKeyService;
  async validateApiKey(AccessToken: string): Promise<boolean | HttpException> {
    try {
      const AccessTokenFound = await this.userRepository.findOne({
        where: {
          AccessToken: AccessToken,
        },
      });
      if (AccessTokenFound) {
        return this.apiKeyService === AccessTokenFound;
      } else {
        return new HttpException(
          'AccessToken Invalid or Token already expired',
          400,
        );
      }
    } catch {
      return new HttpException(
        'AccessToken Invalid or Token already expired',
        400,
      );
    }
  }
}
