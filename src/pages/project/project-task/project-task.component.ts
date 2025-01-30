import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';

@Component({
  selector: 'project-task',
  imports: [
    CommonModule,
    AppHeader,
  ],
  templateUrl: './project-task.component.html',
  styleUrl: './project-task.component.scss'
})
export class ProjectTask {

  title: string = 'PROJECT_MENU_TASK_TITLE';
  subtitle: string = 'PROJECT_MENU_TASK_SUBTITLE';
}
