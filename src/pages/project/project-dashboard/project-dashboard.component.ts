import { Component } from '@angular/core';
import { ProjectInfo } from './project-info/project-info.component';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { ProjectBurndown } from "./project-burndown/project-burndown.component";
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ProjectTaskList } from "./project-task-list/project-task-list.component";
import { ProjectPriorityOverview } from './project-priority-overview/project-priority-overview.component';
import { ProjectTaskOverview } from './project-task-overview/project-task-overview.component';
import { ProjectBurnup } from "./project-burnup/project-burnup.component";

type BurnType = 'burnup' | 'burndown';

@Component({
  selector: 'project-dashboard',
  imports: [
    CommonModule,
    AppHeader,
    ScrollPanelModule,
    ProjectInfo,
    ProjectBurnup,
    ProjectBurndown,
    ProjectPriorityOverview,
    ProjectTaskOverview,
    ProjectTaskList,
  ],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.scss'
})
export class ProjectDashboard {

  title: string = 'PROJECT_MENU_DASHBOARD_TITLE';
  subtitle: string = 'PROJECT_MENU_DASHBOARD_SUBTITLE';

  burnType: BurnType = 'burnup';
  onSelectedType(type: BurnType) {
    this.burnType = type;
  }
}
