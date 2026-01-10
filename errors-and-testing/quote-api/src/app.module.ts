import { Module } from '@nestjs/common';
import { QuoteModule } from './quote/quote.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'root',
      host: 'localhost',
      port: 5432,
      database: 'quoteapi',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    QuoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
