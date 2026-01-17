import { IsNumber, IsString, IsDateString, IsPositive } from 'class-validator';

export class Ticket {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  artist: string;

  @IsString()
  venue: string;

  @IsDateString()
  date: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  description: string;
}