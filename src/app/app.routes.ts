import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.component';
import { authenGuard } from '../helper/guard/authen.guard';

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
    loadChildren: () => import('../pages/workspace/workspace.module').then(m => m.WorkspaceModule),
    canActivate: [authenGuard]
  },
  {
    path: 'feedback',
    loadChildren: () => import('../pages/feedback/feedback.module').then(m => m.FeedbackModule),
    canActivate: [authenGuard]
  },
  {
    path: 'project/:id',
    loadChildren: () => import('../pages/project/project.module').then(m => m.ProjectModule),
    canActivate: [authenGuard]
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [authenGuard]
  }
];
