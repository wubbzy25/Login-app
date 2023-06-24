import { CodeValidateService } from 'src/code/code-validate.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { EmailService } from './gmail.service';
//ruta principal (http://localhost:3000/)
@Controller()
export class UsersController {
  //definimos la clase userService
  constructor(private usersServices: UsersService) {}
  //ruta (http://localhost:3000/register)
  @Post('register')
  Registeruser(@Body() user: CreateUserDto) {
    return this.usersServices.registerUser(user);
  }
  //ruta (http://localhost:3000/login)
  @Get('login')
  Loginuser(@Body() user: CreateUserDto) {
    return this.usersServices.loginUser(user);
  }

  @Post('/reset')
  ResetPassword(@Body() user: CreateUserDto) {
    return this.usersServices.updatePassword(user);
  }
}
//ruta (http://localhost:3000/gmail)
@Controller('gmail')
export class GmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly codeValidateService: CodeValidateService,
  ) {}
  //ruta (http://localhost:3000/gmail/send)
  @Post('send')
  async Sendgmail(@Body('to') to: string) {
    try {
      await this.emailService.sendEmail(to);
      return { success: true, message: 'Correo electrónico enviado' };
    } catch (error) {
      return {
        success: false,
        message: 'Error al enviar el correo electrónico',
      };
    }
  }
  @Get('code')
  Code(@Body('code') code: string) {
    return this.codeValidateService.ValidateCode(code);
  }
}
