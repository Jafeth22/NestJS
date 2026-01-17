import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { CartModule } from './cart/cart.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [TicketsModule, CartModule, ConfigModule.forRoot({
    envFilePath: ['.env'],
    load: [configuration],
    isGlobal: true,
  }), UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
