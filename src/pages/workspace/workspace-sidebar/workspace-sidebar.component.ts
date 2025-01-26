import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';

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

  currentTabIndex: number = 0;
  listMenu: any[] = [];

  ngOnInit(): void {
    this.listMenu = [
      { type: 'menu', tabIndex: 0, label: 'WORKSPACE_MENU_PROJECT', icon: 'pi pi-th-large' },
      { type: 'menu', tabIndex: 1, label: 'WORKSPACE_MENU_JOIN', icon: 'pi pi-sign-in' },
      { type: 'divider', },
      { type: 'menu', tabIndex: 2, label: 'WORKSPACE_MENU_USERS', icon: 'pi pi-users' },
    ];
  }

  onChangeTabIndexEvent = output<number>();
  onChangeTabIndex(index: any): void {
    this.currentTabIndex = index;
    this.onChangeTabIndexEvent.emit(this.currentTabIndex);
    console.log('Current Tab Index: ', this.currentTabIndex);
  }
}
