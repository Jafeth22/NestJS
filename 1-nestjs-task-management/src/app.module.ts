import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true, // Nestjs will define entities, so it will translate tables and schemas
      synchronize: true, // It always keep the db schema sync with the help of TypeORM
    }),
  ],
  // providers: [TasksService],
})
export class AppModule {}
