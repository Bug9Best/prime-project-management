import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'workspace',
    loadChildren: () => import('../pages/workspace/workspace.module').then(m => m.WorkspaceModule)
  }
];
