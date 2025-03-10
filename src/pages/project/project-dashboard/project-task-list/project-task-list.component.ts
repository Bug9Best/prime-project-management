import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';
import { ProjectsModel } from '../../../../services/project/project.service';
import { AppEmpty } from '../../../../components/app-empty/app-empty.component';

@Component({
  selector: 'project-task-list',
  imports: [
    TranslateModule,
    DividerModule,
    AppEmpty
  ],
  templateUrl: './project-task-list.component.html',
  styleUrl: './project-task-list.component.scss'
})
export class ProjectTaskList {

  @Input()
  taskData: any = <any>{};
  emptyTitle: string = 'project.empty.task.title';
  emptyDescription: string = 'project.empty.task.description';
}
