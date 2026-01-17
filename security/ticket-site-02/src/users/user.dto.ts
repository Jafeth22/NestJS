import { IsNumber, IsEmail, IsNotEmpty, IsString, IsArray } from 'class-validator';
import { Role } from './role.enum';

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

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  roles: Role[];

  constructor(id: number, email: string, encodedPassword: string, roles: Role[]) {
    this.id = id;
    this.email = email;
    this.encodedPassword = encodedPassword;
    this.roles = roles
  }
}