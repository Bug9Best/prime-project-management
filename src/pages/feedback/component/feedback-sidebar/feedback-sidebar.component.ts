import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'feedback-sidebar',
  imports: [
    CommonModule,
    DividerModule,
    TranslateModule
  ],
  templateUrl: './feedback-sidebar.component.html',
  styleUrl: './feedback-sidebar.component.scss'
})
export class FeedbackSidebar {

  currentTabIndex: number = 0;
  listMenu: any[] = [];

  ngOnInit(): void {
    this.listMenu = [
      { type: 'menu', tabIndex: 0, label: 'feedback.menu.admin', icon: 'pi pi-list' },
    ];
  }

  onChangeTabIndexEvent = output<number>();
  onChangeTabIndex(index: any): void {
    this.currentTabIndex = index;
    this.onChangeTabIndexEvent.emit(this.currentTabIndex);
    console.log('Current Tab Index: ', this.currentTabIndex);
  }
}
