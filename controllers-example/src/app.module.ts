import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpeakersModule } from './speakers/speakers.module';
import { AttendeesModule } from './attendees/attendees.module';

@Module({
  imports: [SpeakersModule, AttendeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
