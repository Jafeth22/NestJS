import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll() {
    return {
      tickets: this.ticketsService.findAll(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const ticket = this.ticketsService.findOne(Number(id));
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return {
      ticket: ticket,
    };
  }
}