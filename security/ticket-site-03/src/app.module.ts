import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { CartModule } from './cart/cart.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [TicketsModule, CartModule, ConfigModule.forRoot({
    envFilePath: ['.env'],
    load: [configuration],
    isGlobal: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
