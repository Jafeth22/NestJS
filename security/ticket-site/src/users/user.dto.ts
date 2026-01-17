import { IsNumber, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  encodedPassword: string;

  constructor(id: number, email: string, encodedPassword: string) {
    this.id = id;
    this.email = email;
    this.encodedPassword = encodedPassword;
  }
}
