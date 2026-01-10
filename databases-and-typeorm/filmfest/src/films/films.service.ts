import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Venue } from './entities/venue.entity';
import { CreateVenueDto } from './dto/create-venue.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    // Start Transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const venues = await Promise.all(
        createFilmDto.venues.map(async (createVenueDto: CreateVenueDto) => {
          let venue = await queryRunner.manager.findOne(Venue, {
            where: { name: createVenueDto.name },
          });
          if (!venue) {
            venue = queryRunner.manager.create(Venue, createVenueDto);
            await queryRunner.manager.save(Venue, venue);
          }
          return venue;
        }),
      );

      const film = queryRunner.manager.create(Film, {
        ...createFilmDto,
        venues,
      });
      await queryRunner.manager.save(Film, film);

      // Commit Transaction
      await queryRunner.commitTransaction();
      return film;
    } catch (error) {
      // Roll back Transaction on error
      await queryRunner.rollbackTransaction();
      throw new Error(`I couldn't create this film: ${error.message}`);
    } finally {
      // Release QueryRunner
      await queryRunner.release();
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.filmRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number, withRelations: boolean = false) {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: withRelations ? ['detail', 'reviews', 'venues'] : [],
    });
    if (!film) throw new NotFoundException("I can't find that film!");
    return film;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.filmRepository.preload({ id, ...updateFilmDto });
    if (!film) throw new NotFoundException("I can't update that film!");
    return this.filmRepository.save(film);
  }

  async remove(id: number) {
    const film = await this.findOne(id);
    return this.filmRepository.remove(film);
  }
}
