import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost } from "@nestjs/core";
import { AllExceptionsFilter } from "./shared/exceptions.filter";
import * as cookieParser from "cookie-parser";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setViewEngine("ejs");
  app.setBaseViewsDir(join(__dirname, "..", "views"));

  app.use(cookieParser());

  app.enableCors({
    origin: "*",
    credentials: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>("port");

  console.log(`Server running on port ${port}`);
  await app.listen(port);
}
bootstrap();
