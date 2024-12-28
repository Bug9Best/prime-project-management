/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */
import { ModuleWithProviders, NgModule, Optional, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogService, DynamicDialogConfig, DynamicDialog } from 'primeng/dynamicdialog';
import { ChaosAuth, ChaosAuthInterceptor } from '.';

@NgModule({
  imports: [
    CommonModule, 
    DynamicDialog
  ]
})
export class ChaosAuthModule {
  static forRoot(): ModuleWithProviders<ChaosAuthModule> {
    let providers: Provider[] = [
      ChaosAuth,
      ChaosAuthInterceptor,
      DialogService,
      DynamicDialogConfig
    ];
    
    providers.push(
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ChaosAuthInterceptor,
        multi: true
      }
    );

    return {
      ngModule: ChaosAuthModule,
      providers: providers
    }
  }

}
