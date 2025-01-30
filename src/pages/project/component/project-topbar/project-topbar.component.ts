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
        label: 'SECTION_GET_START',
        routerLink: '/home'
      },
      {
        label: 'SECTION_WORKSPACE',
        routerLink: '/workspace'
      },
      {
        label: 'SECTION_PROFILE',
        routerLink: '/profile'
      },
    ];

}
