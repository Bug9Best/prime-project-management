import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { MeterGroupModule } from 'primeng/metergroup';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'project-progress',
  imports: [
    CommonModule,
    TranslateModule,
    DividerModule,
    MeterGroupModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './project-progress.component.html',
  styleUrl: './project-progress.component.scss'
})
export class ProjectProgress {
  value = [
    { label: 'Low', color: '#60a5fa', value: 16 },
    { label: 'Medium', color: '#fbbf24', value: 8 },
    { label: 'High', color: '#34d399', value: 24 },
];
}
