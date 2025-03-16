import { Component, inject } from '@angular/core';
import { ProjectInfo } from './project-info/project-info.component';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { ProjectBurndown } from "./project-burndown/project-burndown.component";
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ProjectTaskList } from "./project-task-list/project-task-list.component";
import { ProjectPriorityOverview } from './project-priority-overview/project-priority-overview.component';
import { ProjectTaskOverview } from './project-task-overview/project-task-overview.component';
import { ProjectBurnup } from "./project-burnup/project-burnup.component";
import { ProjectService, ProjectsModel } from '../../../services/project/project.service';
import { ActivatedRoute } from '@angular/router';

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

  projectID: string = '';
  projectData: ProjectsModel = <any>{};

  title: string = 'project.title.dashboard';
  subtitle: string = 'project.subtitle.dashboard';

  constructor(
    private activateRoute: ActivatedRoute,
  ) {
    this.activateRoute.params
      .subscribe(params => {
        if (!params['id']) return;
        this.projectID = params['id'];
      });
  }

  burnType: BurnType = 'burnup';
  onSelectedType(type: BurnType) {
    this.burnType = type;
  }

  projectService = inject(ProjectService);
  ngOnInit() {
    this.getProjectDashboard();
  }

  getProjectDashboard() {
    this.projectService
      .getDashboard(this.projectID)
      .subscribe((data: any) => {
        this.projectData = data;
      });
  }
}
