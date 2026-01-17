import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { CsrfController } from "./csrf.controller";
import * as cookieParser from "cookie-parser";
import * as csurf from "csurf";

@Module({
  controllers: [CsrfController],
})
export class CsrfModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), csurf({ cookie: true }))
      .forRoutes(CsrfController);
  }
}
