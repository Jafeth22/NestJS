import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilerDto } from './dto/get-task-filter-dto';
import { TaskReposity } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskReposity)
    private taskReposity: TaskReposity,
  ) {}

  getAllTasks(filterDto: GetTaskFilerDto, user: User): Promise<Task[]> {
    return this.taskReposity.getAllTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskReposity.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Task with ID -${id}- not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskReposity.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskReposity.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID -${id}- not found`);
    }
  }

  async updateTask(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;

    await this.taskReposity.save(task);

    return task;
  }
}
