import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { TicketsModule } from "../tickets/tickets.module";
import { AuthModule } from "../auth/auth.module";
import { AuthGuard } from "../auth/auth.guard";
import { CsrfModule } from "../csrf/csrf.module";
import { CsrfGuard } from "../csrf/csrf.guard";
import * as csurf from "csurf";
import * as cookieParser from "cookie-parser";

@Module({
  imports: [TicketsModule, AuthModule, CsrfModule],
  providers: [CartService, AuthGuard, CsrfGuard],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), csurf({ cookie: true }))
      .forRoutes(CartController);
  }
}
