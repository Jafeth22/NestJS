import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    TicketsModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.shared', `.env.${process.env.NODE_ENV}`], // take that file from the root directory
      load: [configuration], // load the configuration function
      isGlobal: true, // to be able to use it in other modules, without importing again
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
