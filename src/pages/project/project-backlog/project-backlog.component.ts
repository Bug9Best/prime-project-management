import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';

@Component({
  selector: 'project-backlog',
  imports: [
    CommonModule,
    AppHeader,
  ],
  templateUrl: './project-backlog.component.html',
  styleUrl: './project-backlog.component.scss'
})
export class ProjectBacklog {

  title: string = 'PROJECT_MENU_BACKLOG_TITLE';
  subtitle: string = 'PROJECT_MENU_BACKLOG_SUBTITLE';

}
