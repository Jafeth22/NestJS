import { Injectable, BadRequestException } from '@nestjs/common';
import { CartItem } from './cart-item.model';
import { TicketsService } from '../tickets/tickets.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CartService {
  private cart: CartItem[] = [];
  private nextId = 1;
  private readonly maxCartItems: number;

  constructor(
    private readonly ticketsService: TicketsService,
    private readonly configService: ConfigService,
  ) {
    this.maxCartItems = configService.getOrThrow('maxCartItems');
  }

  addToCart(ticket_id: number): CartItem {
    if (this.getCart().length >= this.maxCartItems) {
      throw new BadRequestException(`cart is full`);
    }
    const ticket = this.ticketsService.findOne(ticket_id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const cartItem: CartItem = {
      id: this.nextId++,
      ticket: ticket,
    };

    this.cart.push(cartItem);
    return cartItem;
  }

  removeFromCart(cart_item_id: number): void {
    const index = this.cart.findIndex((item) => item.id === cart_item_id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  getCart(): CartItem[] {
    return this.cart;
  }
}
