import { Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { ProjectPrivaryType } from '../../../../services/project/project.service';

@Component({
  selector: 'project-privacy-tag',
  imports: [
    TagModule
  ],
  templateUrl: './project-privacy-tag.component.html',
  styleUrl: './project-privacy-tag.component.scss'
})
export class ProjectPrivacyTag {

  ProjectPrivaryType = ProjectPrivaryType;
  type = input<ProjectPrivaryType>(ProjectPrivaryType.PRIVATE);
  styleClass = input<string>('w-full');
}
