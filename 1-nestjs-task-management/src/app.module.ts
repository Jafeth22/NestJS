import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Here we are using envFiles per environment, the order will import
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      // Nestjs will define entities, so it will translate tables and schemas
      autoLoadEntities: true,
      // It always keep the db schema sync with the help of TypeORM
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
