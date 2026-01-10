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
  ParseIntPipe,
} from '@nestjs/common';
import { SpeakersService } from './speakers.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';

@Controller('speakers')
export class SpeakersController {
  // Injecting the SpeakersService to use its methods
  // With this, it won't be necessary to manually create an instance of SpeakersService each time
  constructor(private readonly speakersService: SpeakersService) {}

  // GET /speakers?scheduleDay=1
  // If scheduleDay is provided, it will be parsed as an integer
  // using the ParseIntPipe method, this is called a "pipe" in NestJS
  @Get()
  findAll() {
    return this.speakersService.findAll();
  }

  // GET /speakers/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): any {
    return this.speakersService.findOne(id);
  }

  @Post()
  create(@Body() createSpeakerDto: CreateSpeakerDto) {
    return this.speakersService.create(createSpeakerDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updated: { name?: string; expertise?: string },
  ) {
    return this.speakersService.update(id, updated);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 = the server successfully processed the request, but is not returning any content
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.speakersService.delete(+id);
  }
}
