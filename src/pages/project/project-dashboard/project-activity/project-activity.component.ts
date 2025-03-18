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
    this.taskLoggingService.getLoggingData(this.projectID)
      .subscribe((res: any) => {
        this.activityData = res;
      });
  }

  onSelectTask(item: any) {
    this.projectContent.onSetTabIndex(5);
    this.projectContent.setTaskState(true, item.task_id);
  }

  getLogging(item: any) {
    if (item.action_key == "assigned") {
      return item.target_user_name;
    }
    else if (item.action_key == "sprint_id") {
      return item.target_sprint_name;
    } else if (item.action_key == "start_date") {
      return item.action_value;
    } else if (item.action_key == "end_date") {
      return item.action_value;
    } else if (item.action_key == "estimate_time") {
      return item.action_value;
    } else if (item.action_key == "actual_time") {
      return item.action_value;
    }

    return 'log.' + item.action_value;
  }
}
