import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger); // Applying the functional middleware globally
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
