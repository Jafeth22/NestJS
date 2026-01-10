import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ResponseLogger } from './middleware/response-logger.middleware';

@Module({
  imports: [
    // forRoot = loads .env file and makes variables available throughout the app
    // expandVariables = allows referencing other env variables like DB_HOST=${OTHER_ENV_VAR}
    ConfigModule.forRoot({ expandVariables: true }),
    DatabaseModule,
    FilmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(middlewareConsumer: MiddlewareConsumer) {
    middlewareConsumer.apply(ResponseLogger).forRoutes('*');
  }
}
