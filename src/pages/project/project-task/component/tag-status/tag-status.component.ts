import { Component, input } from '@angular/core';
import { TaskStatusModel } from '../../../../../services/task_scrum/task_scrum.service';
import { TagModule } from 'primeng/tag';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tag-status',
  imports: [
    TranslateModule,
    TagModule
  ],
  templateUrl: './tag-status.component.html',
  styleUrl: './tag-status.component.scss'
})
export class TagStatus {

  TaskStatus = TaskStatusModel;
  status = input<TaskStatusModel>(TaskStatusModel.TODO);
  styleClass = input<string>('w-10rem');
}
