import { Component, Input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { TaskScrumModel } from '../../../../../services/task_scrum/task_scrum.service';
import { ButtonModule } from 'primeng/button';
import { TaskActivity } from '../task-activity/task-activity.component';
import { TaskDescription } from '../task-description/task-description.component';
import { TaskCommend } from '../task-commend/task-commend.component';

@Component({
  selector: 'task-info',
  imports: [
    TranslateModule,
    DividerModule,
    ButtonModule,
    TaskActivity,
    TaskDescription,
    TaskCommend
  ],
  templateUrl: './task-info.component.html',
  styleUrl: './task-info.component.scss'
})
export class TaskInfo {

  @Input()
  taskData: TaskScrumModel = <any>{};


  onCommentEvent = output<void>();
  onComment() {
    this.onCommentEvent.emit();
  }
}
