import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Film, (film) => film.reviews)
  film: Film;
}
