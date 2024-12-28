/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */

import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChaosSocketConfig } from './socket.config';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class ChaosSocketModule {
  static forRoot(config: ChaosSocketConfig): ModuleWithProviders<ChaosSocketModule> {
    let providers: Provider[] = [];
    providers.push({ provide: ChaosSocketConfig, useValue: config });

    return {
      ngModule: ChaosSocketModule,
      providers: providers
    }
  }
}
