import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'project-task-list',
  imports: [
    TranslateModule,
    DividerModule
  ],
  templateUrl: './project-task-list.component.html',
  styleUrl: './project-task-list.component.scss'
})
export class ProjectTaskList {

}
