import { Component, input } from '@angular/core';
import { ProjectType } from '../../../../services/project/project.service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'project-type-tag',
  imports: [
    TagModule
  ],
  templateUrl: './project-type-tag.component.html',
  styleUrl: './project-type-tag.component.scss'
})
export class ProjectTypeTag {

  ProjectType = ProjectType;
  type = input<ProjectType>(ProjectType.SCRUM);
  styleClass = input<string>('w-full');
}
