import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TagModule } from 'primeng/tag';
import { TaskTypeModel } from '../../../../../services/task/task.service';

@Component({
  selector: 'tag-type',
  imports: [
    TranslateModule,
    TagModule
  ],
  templateUrl: './tag-type.component.html',
  styleUrl: './tag-type.component.scss'
})
export class TagType {

  TaskType = TaskTypeModel
  type = input<TaskTypeModel>(TaskTypeModel.TASK);
  styleClass = input<string>('w-10rem');
}
