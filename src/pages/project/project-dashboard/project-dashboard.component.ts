import { Component, inject, ViewChild } from '@angular/core';
import { ProjectInfo } from './project-info/project-info.component';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ProjectTaskList } from "./project-task-list/project-task-list.component";
import { ProjectPriorityOverview } from './project-priority-overview/project-priority-overview.component';
import { ProjectTaskOverview } from './project-task-overview/project-task-overview.component';
import { ProjectService, ProjectsModel } from '../../../services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectActivity } from './project-activity/project-activity.component';
import { CustomerModel } from '../../../services/customer/customer.service';

type BurnType = 'burnup' | 'burndown';

@Component({
  selector: 'project-dashboard',
  imports: [
    CommonModule,
    AppHeader,
    ScrollPanelModule,
    ProjectInfo,
    ProjectPriorityOverview,
    ProjectTaskOverview,
    ProjectTaskList,
    ProjectActivity
  ],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.scss'
})
export class ProjectDashboard {

  projectID: string = '';
  projectData: ProjectsModel = <any>{};
  customerData: CustomerModel = <any>{};
  priorityOverview: any = []
  statusOverview: any = []

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
        this.projectData = data.projects_info;
        this.customerData = data.customer;
        this.priorityOverview = data.priority_overview;
        this.statusOverview = data.status_overview;
        this.setValue();
      });
  }

  @ViewChild(ProjectPriorityOverview)
  projectPriorityOverview!: ProjectPriorityOverview;

  @ViewChild(ProjectTaskOverview)
  projectTaskOverview!: ProjectTaskOverview;
  setValue() {
    this.projectPriorityOverview.setValues(this.priorityOverview);
    this.projectTaskOverview.setValues(this.statusOverview);
  }
}
