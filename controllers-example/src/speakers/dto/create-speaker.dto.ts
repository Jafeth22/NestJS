import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSpeakerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  expertise: string;

  @IsEmail()
  email: string;
}
