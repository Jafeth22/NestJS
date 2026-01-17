import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  plaintextPassword: string;

  constructor(email: string, plaintextPassword: string) {
    this.email = email;
    this.plaintextPassword = plaintextPassword;
  }
}
