import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { listKanbanProjectMenu, listScrumProjectMenu, listWaterfallProjectMenu } from '../../../../../public/data/menu';
import { ProjectsModel } from '../../../../services/project/project.service';
import { AuthService } from '../../../../services/auth/auth.service';

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

  currentUser: any = null;

  @Input()
  projectType: ProjectType = 'SCRUM';

  projectData: any;

  @Input()
  currentTabIndex: number = 0;
  listMenu: any[] = [];

  constructor(
    private auth: AuthService
  ) {
    this.currentUser = this.auth.getUserData();
  }

  checkProjectType(type: ProjectType, data?: ProjectsModel): void {
    this.projectData = data;
    switch (type) {
      case 'SCRUM':
        this.listMenu = listScrumProjectMenu;
        if(this.currentUser.id !== this.projectData?.owner_id) {
          this.listMenu = this.listMenu.filter((item) => item.tabIndex !== 8);
        }
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

  ngOnchanges(changes: any) {
    console.log(changes);
    if (changes.projectType) {
      this.checkProjectType(changes.projectType.currentValue);
    }
  }
}
