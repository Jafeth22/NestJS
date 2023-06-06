import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilerDto } from './dto/get-task-filter-dto';
import { TaskReposity } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskReposity)
    private taskReposity: TaskReposity,
  ) {}

  getAllTasks(filterDto: GetTaskFilerDto): Promise<Task[]> {
    return this.taskReposity.getAllTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskReposity.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID -${id}- not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskReposity.createTask(createTaskDto, user);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskReposity.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID -${id}- not found`);
    }
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    await this.taskReposity.save(task);

    return task;
  }
}
