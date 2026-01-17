import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { AuthGuard } from "../auth/auth.guard";
import { CsrfGuard } from "../csrf/csrf.guard";

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart() {
    const cart_items = this.cartService.getCart();
    return {
      cart_items: cart_items,
    };
  }

  @UseGuards(AuthGuard, CsrfGuard)
  @Post(":ticket_id")
  addToCart(@Param("ticket_id") ticket_id: string) {
    try {
      this.cartService.addToCart(Number(ticket_id));
    } catch (error: any) {
      throw new NotFoundException(error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(":cart_item_id")
  removeFromCart(@Param("cart_item_id") cart_item_id: string) {
    try {
      this.cartService.removeFromCart(Number(cart_item_id));
    } catch (error: any) {
      throw new NotFoundException(error.message);
    }
  }
}
