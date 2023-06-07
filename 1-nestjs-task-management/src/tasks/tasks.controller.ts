import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilerDto } from './dto/get-task-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard()) // This is going to protect the entire controller
export class TasksController {
  private logger = new Logger('TasksController');
  /**
   * if we add private/public before the name, typeScript will take it
   * as property/variable for this controller
   */
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTaskFilerDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User: "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getAllTasks(filterDto, user);
  }

  /**
   * When use the : it means that it will part of the path (it is a path param),
   * so, it is a value that we can extract
   */
  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch(':id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatus: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatus;
    return this.tasksService.updateTask(id, status, user);
  }
}
