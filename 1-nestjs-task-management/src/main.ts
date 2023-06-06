import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  // AppModule = Route module of the app
  // await NestFactory.create() = Creates a new app
  const app = await NestFactory.create(AppModule);

  // If NestJS encounters any the of valitations (decorators) that are in the app
  // (this case in the DTO), it will know to execute validation, and it will save
  // us from a lot of code creating valiations in the controller
  app.useGlobalPipes(new ValidationPipe());
  // This is to import automatically the interceptors
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
