import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { TaskScrumModel } from '../../../../../services/task_scrum/task_scrum.service';
import { AppEmpty } from '../../../../../components/app-empty/app-empty.component';

@Component({
  selector: 'task-description',
  imports: [
    TranslateModule,
    DividerModule,
    AppEmpty  
  ],
  templateUrl: './task-description.component.html',
  styleUrl: './task-description.component.scss'
})
export class TaskDescription {

  @Input()
  taskData: TaskScrumModel = <any>{};
  emptyTitle = 'project.empty.taskDescription.title';
  emptyDescription = 'project.empty.taskDescription.description';
}
