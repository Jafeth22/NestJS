import { Ticket } from '../tickets/ticket.model';
import { IsNumber, IsPositive, IsObject } from 'class-validator';

export class CartItem {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsObject()
  ticket: Ticket;
}