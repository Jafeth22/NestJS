import { Datestamps } from 'src/common/entities/datestamps';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Detail } from './detail.entity';
import { Review } from './review.entity';
import { Venue } from './venue.entity';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column(() => Datestamps, { prefix: false })
  datestamps: Datestamps;

  @OneToOne(() => Detail, { cascade: true })
  @JoinColumn()
  detail: Detail;

  @OneToMany(() => Review, (review) => review.film, { cascade: true })
  @JoinColumn()
  reviews: Review[];

  @ManyToMany(() => Venue, (venue) => venue.films, { cascade: true })
  @JoinTable()
  venues: Venue[];
}
