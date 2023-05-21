import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // AppModule = Route module of the app
  // await NestFactory.create() = Creates a new app
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
