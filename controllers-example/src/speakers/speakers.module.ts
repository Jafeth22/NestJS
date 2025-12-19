import { Module } from '@nestjs/common';
import { SpeakersController } from './speakers.controller';

@Module({
  controllers: [SpeakersController],
})
export class SpeakersModule {}
