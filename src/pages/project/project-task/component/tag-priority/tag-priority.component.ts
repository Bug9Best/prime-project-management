import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TagModule } from 'primeng/tag';
import { TaskPriorityModel } from '../../../../../services/task/task.service';

@Component({
  selector: 'tag-priority',
  imports: [
    TranslateModule,
    TagModule
  ],
  templateUrl: './tag-priority.component.html',
  styleUrl: './tag-priority.component.scss'
})
export class TagPriority {

  TaskPriority = TaskPriorityModel;
  priority = input<TaskPriorityModel>(TaskPriorityModel.LOW);
  styleClass = input<string>('w-10rem');
}
