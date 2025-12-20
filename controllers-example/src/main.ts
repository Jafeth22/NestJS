import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // make sure the data is enforced to follow the rules defined in the DTOs in all the app
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // it removes properties that are not in the DTO
    }),
  ); // Enable global pipes if needed
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
