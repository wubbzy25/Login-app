import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthenticatedMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['accesstoken'];

    // Verifica si existe un accessToken
    if (accessToken) {
      // Busca el usuario en la base de datos utilizando el AccessToken
      throw new UnauthorizedException('User already authenticated');
    }

    next();
  }
}
