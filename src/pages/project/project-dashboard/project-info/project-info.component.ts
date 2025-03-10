import { Component, Input } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProjectsModel } from '../../../../services/project/project.service';

@Component({
  selector: 'project-info',
  imports: [
    TranslateModule,
    DividerModule,
    AvatarModule,
    AvatarGroupModule,
    TooltipModule,
    ProgressBarModule
  ],
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.scss'
})
export class ProjectInfo {

  @Input()
  projectData: ProjectsModel = <any>{};
}
