import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilerDto } from './dto/get-task-filter-dto';
import { User } from 'src/auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Task)
export class TaskReposity extends Repository<Task> {
  // timestamp = it will show the time in milliseconds for an operation
  private logger = new Logger('TaskReposity', { timestamp: true });

  async getAllTasks(filterDto: GetTaskFilerDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    // createQueryBuilder = it is going to create a query builder,
    // in this case, it is with the entity "task"
    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      // :value we use in the objecto
      // :valueName, { valueName = value}
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.verbose(
        `Failed to get tasks for user "${
          user.username
        }". Filters: $${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    // First, create de object
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    // Then, the action for the db, this case is create
    await this.save(task);

    return task;
  }
}
