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
      label: 'section.getStart',
      routerLink: '/home'
    },
    {
      label: 'section.workspace',
      routerLink: '/workspace'
    },
  ];
}
