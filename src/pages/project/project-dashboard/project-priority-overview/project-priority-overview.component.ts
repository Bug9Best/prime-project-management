import { Component } from '@angular/core';
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

  value = [
    { label: 'Low', color: '#60a5fa', value: 16 },
    { label: 'Medium', color: '#fbbf24', value: 8 },
    { label: 'High', color: '#34d399', value: 24 },
  ];
}
