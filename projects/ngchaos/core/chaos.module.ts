/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */

import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ChaosConfig } from "./chaos.config";

@NgModule()
export class ChaosModule {
  static forRoot(config?: ChaosConfig): ModuleWithProviders<ChaosModule> {
    let providers: Provider[] = [];
    providers.push({ provide: ChaosConfig, useValue: config });
    return {
      ngModule: ChaosModule,
      providers: providers
    }
  }
}
