import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './database.config';

@Module({
  // forRootAsync = allows loading config asynchronously
  // databaseConfig.asProvider() = provides the configuration options for TypeORM
  imports: [TypeOrmModule.forRootAsync(databaseConfig.asProvider())],
})
export class DatabaseModule {}
