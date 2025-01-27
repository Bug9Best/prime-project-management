import { Component } from '@angular/core';
import { AppLayoutTopbar } from '../../../components/app-layout-topbar/app-layout-topbar.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'workspace-topbar',
  imports: [
    AppLayoutTopbar
  ],
  templateUrl: './workspace-topbar.component.html',
  styleUrl: './workspace-topbar.component.scss'
})
export class WorkspaceTopbar {

  listMenu: MenuItem[] = [
    {
      label: 'SECTION_GET_START',
      routerLink: '/home'
    },
  ];
}
