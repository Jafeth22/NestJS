import { Inject, Injectable } from '@nestjs/common';
import { ALGO_MODULE_OPTIONS_TOKEN } from './algo.module-definition';
import type { AlgoModuleOptions } from './interfaces/algo.module-options';
import { Algorithm } from './interfaces/algorithm.interface';
import { contributors } from 'src/contributors/contributors';

@Injectable()
export class AlgoService {
  private readonly algorithm: Algorithm;

  constructor(
    @Inject(ALGO_MODULE_OPTIONS_TOKEN)
    private readonly options: AlgoModuleOptions,
  ) {
    this.algorithm = contributors[options.contributor] as Algorithm;
  }

  getDistance(A: string, B: string): number {
    return this.algorithm.getDistance(A, B);
  }
}
