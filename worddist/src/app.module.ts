import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlgoModule } from './algo/algo.module';
import { GetdistModule } from './getdist/getdist.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AlgoModule.forRoot({
      contributor: process.env.CONTRIBUTOR || 'ian',
    }),
    GetdistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
