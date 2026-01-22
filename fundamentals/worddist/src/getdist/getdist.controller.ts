import { Controller, Get, Param } from '@nestjs/common';
import type { Distance } from './interfaces/distance.interface';
import { AlgoService } from 'src/algo/algo.service';

@Controller('getdist')
export class GetdistController {
  constructor(private readonly algoService: AlgoService) {}

  /**
   * @param A [string]
   * @param B [string]
   * @returns [Distance]
   */
  @Get(':A/:B')
  getDist(@Param('A') A: string, @Param('B') B: string): Distance {
    return {
      words: [A, B],
      distance: this.algoService.getDistance(A, B),
    };
  }
}
