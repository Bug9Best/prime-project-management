/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChaosLiff, ChaosLiffConfig, ChaosLiffInterceptor } from '.';

@NgModule()
export class ChaosLiffModule {
  static forRoot(config: ChaosLiffConfig): ModuleWithProviders<ChaosLiffModule> {
    let providers: Provider[] = [
      ChaosLiff,
      ChaosLiffInterceptor,
      { 
        provide: ChaosLiffConfig, 
        useValue: config
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ChaosLiffInterceptor,
        multi: true
      }
    ];

    return {
      ngModule: ChaosLiffModule,
      providers: providers
    }
  }

}
