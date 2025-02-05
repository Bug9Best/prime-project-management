import { Component } from '@angular/core';
import { AppLayoutTopbar } from '../../../../components/app-layout-topbar/app-layout-topbar.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'feedback-topbar',
  imports: [
    AppLayoutTopbar
  ],
  templateUrl: './feedback-topbar.component.html',
  styleUrl: './feedback-topbar.component.scss'
})
export class FeedbackTopbar {

  listMenu: MenuItem[] = [
    {
      label: 'SECTION_GET_START',
      routerLink: '/home'
    },
    {
      label: 'SECTION_WORKSPACE',
      routerLink: '/workspace'
    },
  ];
}
