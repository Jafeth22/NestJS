import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

@Controller('speakers')
export class SpeakersController {
  // GET /speakers?scheduleDay=1
  // If scheduleDay is provided, it will be parsed as an integer
  // using the ParseIntPipe method, this is called a "pipe" in NestJS
  @Get()
  findAll(
    @Query('scheduleDay', new ParseIntPipe({ optional: true }))
    scheduleDay?: number,
  ) {
    return {
      name: 'Alice Smith',
      expertise: 'Machine Learning',
      scheduleDay: scheduleDay,
    };
  }

  // GET /speakers/:id
  @Get(':id')
  findOne(@Param('id') id: string): any {
    return { id };
  }

  @Post()
  create(@Body() speaker: { name: string; expertise: string }) {
    return speaker;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updated: { name?: string; topic?: string },
  ) {
    return { id, ...updated };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 = the server successfully processed the request, but is not returning any content
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(@Param('id') id: string) {
    return;
  }
}
