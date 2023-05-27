import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskReposity extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    // First, create de object
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    // Then, the action for the db, this case is create
    await this.save(task);

    return task;
  }
}
