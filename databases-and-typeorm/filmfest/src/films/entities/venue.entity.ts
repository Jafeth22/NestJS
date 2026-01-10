import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Film, (film) => film.venues)
  films: Film[];
}
