import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';

@Component({
  selector: 'project-sprint',
  imports: [
    CommonModule,
    AppHeader,
  ],
  templateUrl: './project-sprint.component.html',
  styleUrl: './project-sprint.component.scss'
})
export class ProjectSprint {

  title: string = 'project.title.sprint';
  subtitle: string = 'project.subtitle.sprint';
}
