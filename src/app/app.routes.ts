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
    path: 'feedback',
    loadChildren: () => import('../pages/feedback/feedback.module').then(m => m.FeedbackModule)
  },
  {
    path: 'project/:id',
    loadChildren: () => import('../pages/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfileModule)
  }
];
