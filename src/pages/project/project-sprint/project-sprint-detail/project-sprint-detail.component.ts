import { Component } from '@angular/core';
import { AppHeader } from '../../../../components/app-header/app-header.component';

@Component({
  selector: 'project-sprint-detail',
  imports: [
    AppHeader
  ],
  templateUrl: './project-sprint-detail.component.html',
  styleUrl: './project-sprint-detail.component.scss'
})
export class ProjectSprintDetail {

  title: string = 'project.title.sprint';
  subtitle: string = 'project.subtitle.sprint';

}
