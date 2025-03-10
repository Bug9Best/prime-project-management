import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'task-activity',
  imports: [
    CommonModule,
    TranslateModule,
    TimelineModule,
    DividerModule,
  ],
  templateUrl: './task-activity.component.html',
  styleUrl: './task-activity.component.scss'
})
export class TaskActivity {

  @Input()
  listActivity: any = [];


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
