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

  formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  getLogging(item: any) {
    if (item.action_key == "assigned") {
      return item.target_user_name;
    }
    else if (item.action_key == "sprint_id") {
      return item.target_sprint_name;
    } else if (item.action_key == "start_date") {
      return this.formatDate(new Date(item.action_value));
    } else if (item.action_key == "end_date") {
      return this.formatDate(new Date(item.action_value));
    } else if (item.action_key == "estimate_time") {
      return item.action_value;
    } else if (item.action_key == "actual_time") {
      return item.action_value;
    }

    return 'log.' + item.action_value;
  }
}
