import { Module } from '@nestjs/common';
import { GetdistController } from './getdist.controller';

@Module({
  controllers: [GetdistController]
})
export class GetdistModule {}
