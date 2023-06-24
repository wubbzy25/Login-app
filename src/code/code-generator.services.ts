import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class CodeGeneratorService {
  generateCode(): string {
    const codeLength = 6; // Longitud del código
    const buffer = randomBytes(codeLength);
    const code = buffer.toString('hex').toUpperCase().substring(0, codeLength);

    return code;
  }
}
