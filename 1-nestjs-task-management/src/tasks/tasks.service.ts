import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilerDto } from './dto/get-task-filter-dto';
import { TaskReposity } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskReposity)
    private taskReposity: TaskReposity,
  ) {}
  // private tasks: ITask[] = [];
  // getAllTasks(): ITask[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTaskFilerDto): ITask[] {
  //   const { search, status } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskReposity.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID -${id}- not found`);
    }

    return found;
  }
  // getTaskById(id: string): ITask {
  //   const foundedTask = this.tasks.find((task) => task.id === id);
  //   if (!foundedTask) {
  //     throw new NotFoundException(`Task with ID -${id}- not found`);
  //   }
  //   return foundedTask;
  // }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskReposity.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskReposity.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID -${id}- not found`);
    }
  }

  // updateTask(id: string, status: TaskStatus): ITask {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
