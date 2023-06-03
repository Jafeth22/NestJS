import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // This is the way to create the relationship 1-N for DB Tables
  // eager = true, it is going to fetch the column automatically
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
