import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository()
export class TaskReposity extends Repository<Task> {}
