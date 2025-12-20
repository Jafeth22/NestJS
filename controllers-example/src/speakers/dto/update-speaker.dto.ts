import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSpeakerDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    expertise: string; 

    @IsEmail()
    @IsOptional()
    email: string;
}