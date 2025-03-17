import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { ProjectsModel } from '../../../../services/project/project.service';
import { AppEmpty } from '../../../../components/app-empty/app-empty.component';
import { ActivatedRoute } from '@angular/router';
import { TaskScrumModel, TaskScrumService } from '../../../../services/task_scrum/task_scrum.service';
import { ProjectContent } from '../../component/project-content/project-content.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TagPriority } from '../../project-task/component/tag-priority/tag-priority.component';
import { TagStatus } from '../../project-task/component/tag-status/tag-status.component';
import { TagType } from '../../project-task/component/tag-type/tag-type.component';

@Component({
  selector: 'project-task-list',
  imports: [
    TranslateModule,
    DividerModule,
    AppEmpty,
    ScrollPanelModule,
    TagType,
    TagPriority,
    TagStatus
  ],
  templateUrl: './project-task-list.component.html',
  styleUrl: './project-task-list.component.scss'
})
export class ProjectTaskList {

  projectID: string = '';

  @Input()
  taskData: any = <any>{};
  emptyTitle: string = 'project.empty.task.title';
  emptyDescription: string = 'project.empty.task.description';

  constructor(
    private activateRoute: ActivatedRoute,
    private projectContent: ProjectContent,
    private taskScrumService: TaskScrumService
  ) {
    this.activateRoute.params
      .subscribe(params => {
        if (!params['id']) return;
        this.projectID = params['id'];
      });
  }

  ngOnInit() {
    this.getTask();
  }

  getTask() {
    this.taskScrumService.getProjectTask(this.projectID)
      .subscribe((res: any) => {
        this.taskData = res;
      });
  }

  onSelectTask(task: TaskScrumModel) {
    this.projectContent.onSetTabIndex(5);
    this.projectContent.setTaskState(true, task.id);
  }
}
