import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Venue } from './entities/venue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Venue])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
