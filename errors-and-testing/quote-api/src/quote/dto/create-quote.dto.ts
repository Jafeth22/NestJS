import { IsString, MinLength } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @MinLength(1)
  quote: string;

  @IsString()
  @MinLength(1)
  from: string;
}
