import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';

@Component({
  selector: 'project-gantt',
  imports: [
    CommonModule,
    AppHeader,
  ],
  templateUrl: './project-gantt.component.html',
  styleUrl: './project-gantt.component.scss'
})
export class ProjectGantt {

  title: string = 'PROJECT_MENU_GANTT_TITLE';
  subtitle: string = 'PROJECT_MENU_GANTT_SUBTITLE';
}
