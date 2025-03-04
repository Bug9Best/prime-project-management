import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { DividerModule } from 'primeng/divider';
import { TranslateModule } from '@ngx-translate/core';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'project-backlog',
  imports: [
    TranslateModule,
    CommonModule,
    AppHeader,
    PanelModule,
    DividerModule,
    ScrollPanelModule
  ],
  templateUrl: './project-backlog.component.html',
  styleUrl: './project-backlog.component.scss'
})
export class ProjectBacklog {

  title: string = 'project.title.backlog';
  subtitle: string = 'project.subtitle.backlog';
  labelSprint: string = 'project.title.sprint';
  labelSprintDescription: string = 'project.description.sprint';
  labelTask: string = 'project.title.task';
  labelTaskDescription: string = 'project.description.task';

  listSprint: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  listTask: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
