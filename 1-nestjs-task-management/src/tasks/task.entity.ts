import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { Exclude } from 'class-transformer';
import { User } from './../auth/user.entity';

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
  // toPlainOnly = to transfor to a plain text
  // Exclude({ toPlainOnly: true }) = With this, it won't show any user information when retrieve a task info
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
