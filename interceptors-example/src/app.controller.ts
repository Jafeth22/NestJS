import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerInterceptor } from './logger/logger.interceptor';

// UseInterceptors = Decorator that binds interceptors to the scope of a controller or method
@UseInterceptors(LoggerInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(LoggerInterceptor)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
