import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
  ) {}

  create(createQuoteDto: CreateQuoteDto) {
    const quote = this.quoteRepository.create(createQuoteDto);
    return this.quoteRepository.save(quote);
  }

  findAll() {
    return this.quoteRepository.find();
  }

  async findOne(id: number) {
    const quote = await this.quoteRepository.findOneBy({ id });
    if (!quote) throw new NotFoundException();
    return quote;
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto) {
    const quote = await this.quoteRepository.preload({ id, ...updateQuoteDto });
    if (!quote) throw new NotFoundException();
    return this.quoteRepository.save(quote);
  }

  async remove(id: number) {
    const quote = await this.findOne(id);
    return this.quoteRepository.remove(quote);
  }
}
