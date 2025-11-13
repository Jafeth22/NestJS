import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  // getOrThrow: Get the port from the configuration service
  // if the port is not found, throw an error
  const port = configService.getOrThrow<number>('PORT');

  console.log(`Server running on port: ${port}`);
  await app.listen(port);
}
bootstrap();
