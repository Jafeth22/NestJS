import { Injectable, NotFoundException } from '@nestjs/common';
import { Ticket } from './ticket.model';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';

@Injectable()
export class TicketsService {
  private tickets: Ticket[];
  private readonly dateFormat: string;

  constructor(private readonly configService: ConfigService) {
    this.tickets = [
      {
        id: 1,
        artist: 'Alexander Lemtov',
        venue: 'Madison Square Garden, New York',
        date: '2025-09-02',
        price: 65,
        description:
          'Join Alexander on his global tour. Alexander really needs no introduction since he has already mesmerized the world with his electronic ambient sound.',
      },
      {
        id: 2,
        artist: 'Santiago Martinez',
        venue: 'Hard Rock Live, Orlando',
        date: '2025-09-24',
        price: 135.0,
        description:
          "Experience the magic of Santiago Martinez live. Santiago's groundbreaking blend of traditional and contemporary sounds has enchanted audiences everywhere.",
      },
      {
        id: 3,
        artist: 'Miriam Johnson',
        venue: 'SoFi Stadium',
        date: '2025-10-04',
        price: 85.0,
        description:
          "Don't miss Miriam Johnson as she tours the world, bringing her soulful voice and heartfelt lyrics to life. Miriam has already touched hearts globally with her powerful and emotive performances.",
      },
    ];
    this.dateFormat = configService.getOrThrow('dateFormat');
  }

  findAll(): Ticket[] {
    return this.tickets;
  }

  findOne(id: number): Ticket | undefined {
    const ticket = this.tickets.find((ticket) => ticket.id === id);

    if (!ticket) {
      throw new NotFoundException(`ticket not found`)
    }

    ticket.date = moment(ticket.date).format(this.dateFormat)

    return ticket;
  }}