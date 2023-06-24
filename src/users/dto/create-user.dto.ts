/* eslint-disable prettier/prettier */
export class CreateUserDto {
  name: string;
  gmail: string;
  password: string;
  confirmpassword: string;
  AccessToken: string;
  ResetPasswordCode: string;
  ResetPassword: boolean;
}
