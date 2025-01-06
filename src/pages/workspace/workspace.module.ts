import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkspacePage } from './workspace/workspace.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspacePage
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WorkspaceModule { }
