import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'workspace',
    loadChildren: () => import('../pages/workspace/workspace.module').then(m => m.WorkspaceModule)
  },
  {
    path: 'project/:id',
    loadChildren: () => import('../pages/project/project.module').then(m => m.ProjectModule)
  },
];
