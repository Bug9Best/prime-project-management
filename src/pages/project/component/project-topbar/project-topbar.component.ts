import { Component } from '@angular/core';
import { AppLayoutTopbar } from '../../../../components/app-layout-topbar/app-layout-topbar.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'project-topbar',
  imports: [
    AppLayoutTopbar
  ],
  templateUrl: './project-topbar.component.html',
  styleUrl: './project-topbar.component.scss'
})
export class ProjectTopbar {

  listMenu: MenuItem[] = [
    {
      label: 'app.menu.getStart',
      routerLink: '/home'
    },
    {
      label: 'app.menu.workspace',
      routerLink: '/workspace'
    },
    {
      label: 'app.menu.profile',
      routerLink: '/profile'
    },
  ];
}