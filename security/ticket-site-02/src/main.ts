import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/exceptions.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('port');

  await app.listen(port);
}
bootstrap();
