import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './logger/logger.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor, // Registering LoggerInterceptor as a global interceptor, this will let apply injection in all controllers and routes
    },
  ],
})
export class AppModule {}
