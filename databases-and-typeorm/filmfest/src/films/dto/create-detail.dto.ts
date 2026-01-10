import { IsString, MaxLength } from 'class-validator';

export class CreateDetailDto {
  @IsString()
  @MaxLength(200)
  synopsis: string;
}
