import { Datestamps } from 'src/common/entities/datestamps';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
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

  // cascade: true will automatically save related entities
  @OneToOne(() => Detail, { cascade: true })
  @JoinColumn() // specifies that this side owns the relationship, this will add a detailId column to the Film table
  detail: Detail;

  @OneToMany(() => Review, (review) => review.film, { cascade: true })
  @JoinColumn()
  reviews: Review[];

  @ManyToMany(() => Venue, (venue) => venue.films, { cascade: true })
  @JoinTable()
  venues: Venue[];
}
