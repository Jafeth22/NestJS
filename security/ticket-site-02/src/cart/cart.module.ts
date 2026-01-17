import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TicketsModule } from '../tickets/tickets.module';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [TicketsModule, AuthModule],
  providers: [CartService, AuthGuard],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
