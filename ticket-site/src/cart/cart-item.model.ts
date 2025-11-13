import { Ticket } from '../tickets/ticket.model';

export interface CartItem {
  id: number;
  ticket: Ticket;
}