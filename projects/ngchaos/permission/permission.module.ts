import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChaosPermissionRole } from './permission.role';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChaosPermissionRole
  ],
  exports: [
    ChaosPermissionRole
  ]
})
export class ChaosPermissionModule {}
