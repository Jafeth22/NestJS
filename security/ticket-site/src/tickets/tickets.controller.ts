import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll() {
    try {
      const tickets = this.ticketsService.findAll();
      return { tickets };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const ticket = this.ticketsService.findOne(Number(id));
      if (!ticket) {
        throw new NotFoundException(`Ticket with ID ${id} not found`);
      }
      return { ticket };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw error;
    }
  }
}
