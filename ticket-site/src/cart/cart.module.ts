import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TicketsModule } from '../tickets/tickets.module';
import { ConfigModule } from '@nestjs/config';
import cartConfiguration from '../config/cart-configuration';

@Module({
  imports: [TicketsModule, ConfigModule.forFeature(cartConfiguration)],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}