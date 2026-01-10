import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(); // We can also apply the filter globally
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
