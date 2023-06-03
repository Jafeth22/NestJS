import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Task {
  // If we don't specify (this case is uuid), it will be secuencial
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // This is the way to create the relationship N-1 for DB Tables
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  user: User;
}
