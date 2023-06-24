import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CodeGeneratorAccessTokenService {
  generateAccessToken(): string {
    const claveSecreta = crypto.randomBytes(128).toString('base64');
    return claveSecreta;
  }
}
