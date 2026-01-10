import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  synopsis: string;
}
