import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import { CodeGeneratorService } from 'src/code/code-generator.services';
import { User } from './entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(
    private readonly codeGeneratorService: CodeGeneratorService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'wuubzi30@gmail.com',
        pass: 'jlsyeshfjmabnqfw',
      },
    });
  }

  async sendEmail(to: string) {
    const UserFound = await this.userRepository.findOne({
      where: {
        gmail: to,
      },
    });
    if (!UserFound) {
      throw new HttpException('This Gmail dont exist in DataBase', 400);
    }
    const code = this.codeGeneratorService.generateCode();
    UserFound.ResetPasswordCode = code;
    await this.userRepository.save(UserFound);
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'wuubzi30@gmail.com',
      to,
      subject: 'Restablecer contraseña',
      text: `Oops al parecer haz olvidado tu contraseña, pero tranquilo es normal, te dare un codigo para que puedas restablecerla que expirara en 5 minutos\n\nAqui tienes tu codigo: \n\n ${code} \n\n Ingresalo en la web para restablecer tu contraseña`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.messageId);
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  }
}
