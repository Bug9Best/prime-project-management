import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { listKanbanProjectMenu, listScrumProjectMenu, listWaterfallProjectMenu } from '../../../../../public/data/menu';

type ProjectType = 'SCRUM' | 'WATERFALL' | 'KANBAN';

@Component({
  selector: 'project-sidebar',
  imports: [
    CommonModule,
    TranslateModule,
    DividerModule
  ],
  templateUrl: './project-sidebar.component.html',
  styleUrl: './project-sidebar.component.scss'
})
export class ProjectSidebar {

  @Input()
  projectType: ProjectType = 'SCRUM';
  currentTabIndex: number = 0;
  listMenu: any[] = [];

  checkProjectType(type: ProjectType): void {
    switch (type) {
      case 'SCRUM':
        this.listMenu = listScrumProjectMenu;
        break;
      case 'WATERFALL':
        this.listMenu = listWaterfallProjectMenu;
        break;
      case 'KANBAN':
        this.listMenu = listKanbanProjectMenu;
        break;
      default:
        break;
    }
  }

  onChangeTabIndexEvent = output<number>();
  onChangeTabIndex(index: any): void {
    this.currentTabIndex = index;
    this.onChangeTabIndexEvent.emit(this.currentTabIndex);
  }
}
