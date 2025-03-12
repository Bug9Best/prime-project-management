import { Component, inject, Input, input } from '@angular/core';
import { TaskScrumModel, TaskTypeModel } from '../../../../../services/task_scrum/task_scrum.service';
import { TagType } from '../../../project-task/component/tag-type/tag-type.component';
import { TagPriority } from '../../../project-task/component/tag-priority/tag-priority.component';
import { TagStatus } from '../../../project-task/component/tag-status/tag-status.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AppEmpty } from '../../../../../components/app-empty/app-empty.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectContent } from '../../../component/project-content/project-content.component';

@Component({
  selector: 'sprint-task-list',
  imports: [
    TranslateModule,
    AppEmpty,
    TagType,
    TagPriority,
    TagStatus,
    AvatarModule,
    AvatarGroupModule
  ],
  templateUrl: './sprint-task-list.component.html',
  styleUrl: './sprint-task-list.component.scss'
})
export class SprintTaskList {

  TaskType = TaskTypeModel;

  @Input()
  listTask?: TaskScrumModel[] = [];

  emptyTitle = 'project.empty.task.title';
  emptyDescription = 'project.empty.task.description';

  projectContent = inject(ProjectContent);
  onSelectTask(task: TaskScrumModel) {
    if (!task) return;
    this.projectContent.setSprintTaskState(true, task.sprint_id.toString(), task.id);
  }
}
