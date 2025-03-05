import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { DividerModule } from 'primeng/divider';
import { TranslateModule } from '@ngx-translate/core';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FormsModule } from '@angular/forms';
import { DndDropEvent, DndModule } from 'ngx-drag-drop';
import { MessageService } from 'primeng/api';
import { SprintModel, SprintService } from '../../../services/sprint/sprint.service';
import { TaskModel, TaskService } from '../../../services/task/task.service';
import { AppEmpty } from '../../../components/app-empty/app-empty.component';

@Component({
  selector: 'project-backlog',
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    AppHeader,
    AppEmpty,
    PanelModule,
    DividerModule,
    ScrollPanelModule,
    DndModule,
  ],
  templateUrl: './project-backlog.component.html',
  styleUrl: './project-backlog.component.scss'
})
export class ProjectBacklog {

  title: string = 'project.title.backlog';
  subtitle: string = 'project.subtitle.backlog';
  labelSprint: string = 'project.title.sprint';
  labelSprintDescription: string = 'project.description.sprint';
  labelTask: string = 'project.title.task';
  labelTaskDescription: string = 'project.description.task';
  emptyTaskTitle: string = 'project.empty.task.title';
  emptyTaskDescription: string = 'project.empty.task.description';
  emptySprintTitle: string = 'project.empty.sprint.title';
  emptySprintDescription: string = 'project.empty.sprint.description';

  listSprint: SprintModel[] = [];
  listTask: TaskModel[] = [];

  constructor(
    private messageService: MessageService,
    private sprintService: SprintService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.getOpenSprint();
    this.getOpenTask();
  }

  getOpenSprint() {
    this.sprintService.getAll().subscribe({
      next: (response: any) => {
        const data = response.data;
        this.listSprint = data;
      },
    });
  }

  getOpenTask() {
    this.taskService.getAll().subscribe({
      next: (response: any) => {
        const data = response.data;
        this.listTask = data;
      },
    });
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  onDraggedTask(item: any) {
    const index = this.listTask.indexOf(item);
    this.listTask.splice(index, 1);
  }

  onDropTask(event: DndDropEvent) {
    if (this.listTask) {
      let index = event.index;

      if (typeof index === 'undefined') {
        index = this.listTask.length;
      }
      this.listTask.splice(index, 0, event.data);
    }
  }

  onDropToSprint(event: DndDropEvent, sprint: any, index: number) {
    console.log('Dropped to sprint', event, sprint, index);
  }
}
