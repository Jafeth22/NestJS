import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/exceptions.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
import { NonceMiddleware } from './shared/nonce.middleware';
import { Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const nonceMiddleware = new NonceMiddleware().use;
  app.use(nonceMiddleware);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", 'http://localhost:3000/'],
          scriptSrc: ["'self'", (req, res: Response) => `'nonce-${res.locals.nonce}'`]
        }
      }
    })
  )

  app.enableCors();

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('port');

  await app.listen(port);
}
bootstrap();
