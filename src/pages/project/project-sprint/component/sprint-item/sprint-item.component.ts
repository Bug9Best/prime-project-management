import { Component, inject, input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { SprintModel, SprintStatus } from '../../../../../services/sprint/sprint.service';
import { CommonModule } from '@angular/common';
import { ProjectContent } from '../../../component/project-content/project-content.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'sprint-item',
  imports: [
    CommonModule,
    TranslateModule,
    TagModule,
    ProgressBarModule
  ],
  templateUrl: './sprint-item.component.html',
  styleUrl: './sprint-item.component.scss'
})
export class SprintItem {

  SprintStatus = SprintStatus;
  sprintData = input<SprintModel>(<any>{});

  get sprintProgress(): number {
    if (!this.sprintData) return 0;
    let total = this.sprintData().total_tasks;
    let completed = this.sprintData().completed_tasks;
    let progress = Math.ceil((completed / total) * 100);
    return progress;
  }

  projectContent = inject(ProjectContent);
  onNavigateToSprintDetail(sprintID: string) {
    this.projectContent.setSprintState(true, sprintID);
  }
}
