import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'workspace-sidebar',
  imports: [
    CommonModule,
    DividerModule,
    TranslateModule
  ],
  templateUrl: './workspace-sidebar.component.html',
  styleUrl: './workspace-sidebar.component.scss'
})
export class WorkspaceSidebar {

  isUser: boolean = false;
  currentTabIndex: number = 0;
  listMenu: any[] = [];


  constructor(
    private authService: AuthService,
  ) {
    this.isUser = this.authService.isUser();
  }

  ngOnInit(): void {
    this.initMenu();
  }

  initMenu(): void {
    if (!this.isUser) {
      this.listMenu = [
        { type: 'menu', tabIndex: 0, label: 'WORKSPACE_MENU_PROJECT', icon: 'pi pi-th-large' },
        { type: 'menu', tabIndex: 1, label: 'WORKSPACE_MENU_JOIN', icon: 'pi pi-sign-in' },
        { type: 'divider', },
        { type: 'menu', tabIndex: 2, label: 'WORKSPACE_MENU_USERS', icon: 'pi pi-users' },
      ];
    } else {
      this.listMenu = [
        { type: 'menu', tabIndex: 0, label: 'WORKSPACE_MENU_PROJECT', icon: 'pi pi-th-large' },
        { type: 'menu', tabIndex: 1, label: 'WORKSPACE_MENU_JOIN', icon: 'pi pi-sign-in' },
        { type: 'divider', },
        { type: 'menu', tabIndex: 3, label: 'FEEDBACK_MENU_SUBMIT', icon: 'pi pi-file-edit' },
      ];
    }
  }

  onChangeTabIndexEvent = output<number>();
  onChangeTabIndex(index: any): void {
    this.currentTabIndex = index;
    this.onChangeTabIndexEvent.emit(this.currentTabIndex);
  }
}
