import { Component } from '@angular/core';
import { AppLayoutTopbar } from '../../../../components/app-layout-topbar/app-layout-topbar.component';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'workspace-topbar',
  imports: [
    AppLayoutTopbar
  ],
  templateUrl: './workspace-topbar.component.html',
  styleUrl: './workspace-topbar.component.scss'
})
export class WorkspaceTopbar {
  isUser: boolean = false;
  listMenu: MenuItem[] = [];

  constructor(
    private authService: AuthService,
  ) {
    this.isUser = this.authService.isUser();
  }

  ngOnInit() {
    this.initMenu();
  }

  initMenu() {
    if (this.isUser) {
      this.listMenu = [
        {
          label: 'app.menu.getStart',
          routerLink: '/home'
        },
      ];
    } else {
      this.listMenu = [
        {
          label: 'app.menu.getStart',
          routerLink: '/home'
        },
        {
          label: 'app.menu.feedback',
          routerLink: '/feedback'
        },
      ];
    }
  }
}
