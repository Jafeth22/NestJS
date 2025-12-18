import { Global, Module } from '@nestjs/common';
import { AlgoService } from './algo.service';
import { AlgoConfigurableModuleClass } from './algo.module-definition';

@Global() // Make the module global to avoid importing it in other modules
@Module({
  providers: [AlgoService],
  exports: [AlgoService], // Export AlgoService to be used in other modules
})
export class AlgoModule extends AlgoConfigurableModuleClass {}
