import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Venue } from './entities/venue.entity';

@Module({
  // forFeature = registers the entities with TypeORM for this module
  // This makes the repositories for these entities available for injection
  imports: [TypeOrmModule.forFeature([Film, Venue])],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
