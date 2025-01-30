import { Component } from '@angular/core';
import { ProjectInfo } from '../component/project-info/project-info.component';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'project-dashboard',
  imports: [
    CommonModule,
    AppHeader,
    ProjectInfo
  ],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.scss'
})
export class ProjectDashboard {

  title: string = 'PROJECT_MENU_DASHBOARD_TITLE';
  subtitle: string = 'PROJECT_MENU_DASHBOARD_SUBTITLE';
}
