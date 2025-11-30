import { Global, Module } from '@nestjs/common';
import { AlgoService } from './algo.service';
import { AlgoConfigurableModuleClass } from './algo.module-definition';

@Global()
@Module({
  providers: [AlgoService],
  exports: [AlgoService]
})
export class AlgoModule extends AlgoConfigurableModuleClass {}
