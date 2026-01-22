import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlgoModule } from './algo/algo.module';
import { GetdistModule } from './getdist/getdist.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  // imports: external modules required in this module
  imports: [
    ConfigModule.forRoot(), // initialize config module, load .env variables
    AlgoModule.forRoot({
      // uses dynamic module pattern to pass config into AlgoModule
      contributor: process.env.CONTRIBUTOR || 'ian',
    }),
    GetdistModule, // brings controller and service into app module
  ],
  controllers: [AppController], // list of controllers instantiated for this module
  providers: [AppService], // list of providers (it can be Service, Repository, Factory, Helper, Adapter) that can be injected into other classes.
  // business logic should be implemented in providers and services
})
export class AppModule {}
