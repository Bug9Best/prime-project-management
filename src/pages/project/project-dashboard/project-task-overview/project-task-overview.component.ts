import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
  selector: 'project-task-overview',
  imports: [
    TranslateModule,
    DividerModule,
    MeterGroupModule,
  ],
  templateUrl: './project-task-overview.component.html',
  styleUrl: './project-task-overview.component.scss'
})
export class ProjectTaskOverview {

  value = [
    { label: 'To Do', color: '#60a5fa', value: 0 },
    { label: 'In Progress', color: '#fbbf24', value: 0 },
    { label: 'Done', color: '#34d399', value: 0 },
  ];

  setValues(values: any) {
    this.value = [{
      label: 'To Do',
      color: '#60a5fa',
      value: (values.todo_tasks / values.total_tasks * 100) || 0
    }, {
      label: 'In Progress',
      color: '#fbbf24',
      value: (values.doing_tasks / values.total_tasks * 100) || 0
    }, {
      label: 'Done',
      color: '#34d399',
      value: (values.done_tasks / values.total_tasks * 100) || 0
    }];
  }
}
