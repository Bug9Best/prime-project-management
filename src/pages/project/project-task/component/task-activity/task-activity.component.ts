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
    DividerModule
  ],
  templateUrl: './task-activity.component.html',
  styleUrl: './task-activity.component.scss'
})
export class TaskActivity {


  @Input()
  listActivity: any = [];
}
