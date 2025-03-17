import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
  selector: 'project-priority-overview',
  imports: [
    TranslateModule,
    DividerModule,
    MeterGroupModule,
  ],
  templateUrl: './project-priority-overview.component.html',
  styleUrl: './project-priority-overview.component.scss'
})
export class ProjectPriorityOverview {

  value: { label: string; color: string; value: any }[] = [
    { label: 'Low', color: '#60a5fa', value: 0 },
    { label: 'Medium', color: '#34d399', value: 0 },
    { label: 'High', color: '#fbbf24', value: 0 },
    { label: 'Critical', color: '#f87171', value: 0 },
  ];

  setValues(values: any) {
    this.value = [{
      label: 'Low',
      color: '#60a5fa',
      value: (values.low_priority / values.total_tasks * 100) || 0
    }, {
      label: 'Medium',
      color: '#34d399',
      value: (values.medium_priority / values.total_tasks * 100) || 0
    }, {
      label: 'High',
      color: '#fbbf24',
      value: (values.high_priority / values.total_tasks * 100) || 0
    }, {
      label: 'Critical',
      color: '#f87171',
      value: (values.critical_priority / values.total_tasks * 100) || 0
    }];
  }
}
