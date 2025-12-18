import { ConfigurableModuleBuilder } from '@nestjs/common';
import { AlgoModuleOptions } from './interfaces/algo.module-options';

export const {
  ConfigurableModuleClass: AlgoConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: ALGO_MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<AlgoModuleOptions>()
  .setClassMethodName('forRoot')
  .build();
