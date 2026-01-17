import { Injectable, BadRequestException } from '@nestjs/common';
import { CartItem } from './cart-item.model';
import { TicketsService } from '../tickets/tickets.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CartService {
  private cartItems: CartItem[] = [];
  private nextId = 1;
  private maxCartItems: number;

  constructor(private readonly ticketsService: TicketsService, private readonly configService: ConfigService) {
    this.maxCartItems = configService.getOrThrow<number>('maxCartItems');
  }

  addToCart(ticket_id: number): CartItem {
    if (this.cartItems.length >= this.maxCartItems) {
      throw new BadRequestException('Cart is full');
    }

    const ticket = this.ticketsService.findOne(ticket_id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const cartItem: CartItem = {
      id: this.nextId++,
      ticket: ticket,
    };

    this.cartItems.push(cartItem);
    return cartItem;
  }

  removeFromCart(cart_item_id: number): void {
    const index = this.cartItems.findIndex((item) => item.id === cart_item_id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getCart(): CartItem[] {
    return this.cartItems;
  }

}
