import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilerDto } from './dto/get-task-filter-dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilerDto): ITask[] {
    const { search, status } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): ITask {
    const foundedTask = this.tasks.find((task) => task.id === id);

    if (!foundedTask) {
      throw new NotFoundException(`Task with ID -${id}- not found`);
    }

    return foundedTask;
  }

  createTask(createTaskDto: CreateTaskDto): ITask {
    const { title, description } = createTaskDto;

    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    const foundedTask = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== foundedTask.id);
  }

  updateTask(id: string, status: TaskStatus): ITask {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
