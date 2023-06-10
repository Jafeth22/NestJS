import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskReposity } from './tasks.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // Here is not necessary to initialize here because it is already done in the app.module
    // When we use it here, it comes with something called config service and it is injectable
    // into our classes and that is used to match the config values
    // ConfigModule,
    TypeOrmModule.forFeature([TaskReposity]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
