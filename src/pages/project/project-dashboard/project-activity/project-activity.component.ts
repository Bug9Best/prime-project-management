import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { AppEmpty } from '../../../../components/app-empty/app-empty.component';
import { TaskLoggingService } from '../../../../services/task-logging/task-logging.service';
import { ActivatedRoute } from '@angular/router';
import { TimelineModule } from 'primeng/timeline';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ProjectContent } from '../../component/project-content/project-content.component';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'project-activity',
  imports: [
    FormsModule,
    CommonModule,
    TranslateModule,
    DividerModule,
    AppEmpty,
    ScrollPanelModule,
    TimelineModule,
  ],
  templateUrl: './project-activity.component.html',
  styleUrl: './project-activity.component.scss'
})
export class ProjectActivity {

  projectID: string = '';

  @Input()
  activityData: any = <any>{};
  emptyTitle: string = 'project.empty.task.title';
  emptyDescription: string = 'project.empty.task.description';

  constructor(
    private activateRoute: ActivatedRoute,
    private projectContent: ProjectContent,
    private taskLoggingService: TaskLoggingService
  ) {
    this.activateRoute.params
      .subscribe(params => {
        if (!params['id']) return;
        this.projectID = params['id'];
      });
  }

  ngOnInit() {
    this.getLoggingData();
  }

  getLoggingData() {
    this.taskLoggingService.getCreateData(this.projectID)
      .subscribe((res: any) => {
        this.activityData = res;
      });
  }

  onSelectTask(item: any) {
    this.projectContent.onSetTabIndex(5);
    this.projectContent.setTaskState(true, item.task_id);
  }
}
