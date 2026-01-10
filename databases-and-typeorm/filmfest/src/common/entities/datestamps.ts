import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class Datestamps {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
