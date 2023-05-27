import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskReposity } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskReposity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
