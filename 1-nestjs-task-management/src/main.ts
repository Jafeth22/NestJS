import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  // AppModule = Route module of the app
  // await NestFactory.create() = Creates a new app
  const app = await NestFactory.create(AppModule);
  // This is to enable request from a different origin, but it is not recomended for production
  app.enableCors();
  // If NestJS encounters any the of valitations (decorators) that are in the app
  // (this case in the DTO), it will know to execute validation, and it will save
  // us from a lot of code creating valiations in the controller
  app.useGlobalPipes(new ValidationPipe());
  // This is to import automatically the interceptors
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = 3000;
  await app.listen(port);
  const logger = new Logger();
  // This will appear on the console when the app it is running
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
