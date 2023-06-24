import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt = require('bcrypt');
import { CodeGeneratorAccessTokenService } from 'src/code/code-access-token.services';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly codeGeneratorAccessTokenService: CodeGeneratorAccessTokenService,
  ) {}

  // Registro de usuario
  async registerUser(user: CreateUserDto) {
    const existingUserName = await this.userRepository.findOne({
      where: { name: user.name },
    });

    const existingUserEmail = await this.userRepository.findOne({
      where: { gmail: user.gmail },
    });
    if (existingUserName) {
      return new HttpException('Name already exists', 400);
    }
    if (existingUserEmail) {
      return new HttpException('Gmail already exists', 400);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const accessToken =
      this.codeGeneratorAccessTokenService.generateAccessToken();

    user.password = hashedPassword;
    user.AccessToken = accessToken;

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async loginUser(user: CreateUserDto) {
    try {
      //realizar una consulta a la db
      const UserAuth = await this.userRepository.findOne({
        where: {
          gmail: user.gmail,
        },
      });
      //Verificar si encontro el gmail
      if (UserAuth) {
        //comparar la contraseña
        const passwordMatch = await bcrypt.compare(
          user.password,
          UserAuth.password,
        );
        //validar si es igual o no
        if (passwordMatch) {
          return new HttpException('Successful authentication', 200);
        } else {
          return new HttpException('The gmail or password is incorrect', 400);
        }
        //no encontro el gmail
      } else {
        return new HttpException('The gmail dont exist', 400);
      }
    } catch (error) {
      console.error(error);
      return new HttpException('a error ocurred', 400);
    }
  }

  //Actualización de contraseña de usuario
  async updatePassword(user: CreateUserDto) {
    if (user.password !== user.confirmpassword) {
      throw new HttpException('Las contraseñas no coinciden', 400);
    }
    const userFound = await this.userRepository.findOne({
      where: { gmail: user.gmail },
    });
    if (!userFound) {
      throw new HttpException('The user does not exist', 400);
    }

    if (userFound.ResetPassword === false) {
      throw new HttpException(
        'You are not authorized to perform this operation.',
        400,
      );
    }
    const newhashedpassword = await bcrypt.hash(user.password, 10);
    userFound.password = newhashedpassword;
    userFound.ResetPasswordCode = '';
    userFound.ResetPassword = false;
    return this.userRepository.save(userFound);
  }
}
