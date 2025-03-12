import { Component, Input, ViewChild } from '@angular/core';
import { TaskScrumModel, TaskScrumService } from '../../../../services/task_scrum/task_scrum.service';
import { SprintModel, SprintService } from '../../../../services/sprint/sprint.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectContent } from '../../component/project-content/project-content.component';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { FormTask } from '../../project-task/component/form-task/form-task.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { AppBreadcrumb } from '../../../../components/app-breadcrumb/app-breadcrumb.component';
import { AppScrolling } from '../../../../components/app-scrolling/app-scrolling.component';
import { TaskControl } from '../../project-task/component/task-control/task-control.component';
import { TaskInfo } from '../../project-task/component/task-info/task-info.component';

@Component({
  selector: 'project-sprint-task-detail',
  imports: [
    TranslateModule,
    AppBreadcrumb,
    AppDialog,
    AppScrolling,
    TaskInfo,
    TaskControl,
    MenuModule,
    ButtonModule,
    FormTask,
    DividerModule
  ],
  templateUrl: './project-sprint-task-detail.component.html',
  styleUrl: './project-sprint-task-detail.component.scss'
})
export class ProjectSprintTaskDetail {

  @Input()
  sprintId: string = '';
  sprintData: SprintModel = <any>{};

  @Input()
  taskID: string = '';
  taskData: TaskScrumModel = <any>{};

  subtitle: string = 'detail.sprint.description';
  labelButton: string = 'project.button.edit.task';
  labelHeader: string = 'detail.task.header';
  labelSubmit: string = 'app.button.save';

  items = [
    { label: 'detail.sprint.header', command: () => this.onNavigateToSprint() },
    { label: '', command: () => this.onNavigateToSprintDetail() },
    { label: '' },
  ];

  taskMenu = [
    {
      label: 'app.button.delete',
      icon: 'pi pi-trash',
      command: () => this.onConfirm()
    }
  ]

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private projectContent: ProjectContent,
    private sprintService: SprintService,
    private taskScrumService: TaskScrumService
  ) { }

  ngOnInit() {
    this.getSprintData();
    this.getTaskData();
  }

  getSprintData() {
    this.sprintService
      .getOne(this.sprintId)
      .subscribe((data) => {
        this.sprintData = data;
        this.items[1].label = this.sprintData.sprint_name;
      });
  }

  getTaskData() {
    this.taskScrumService
      .getOne(this.taskID)
      .subscribe((data) => {
        this.taskData = data;
        this.items[2].label = this.taskData.task_name;
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

  onNavigateToSprint() {
    this.projectContent.setSprintState(false);
    this.projectContent.setSprintTaskState(false);
  }

  onNavigateToSprintDetail() {
    this.projectContent.setSprintTaskState(false);
    this.projectContent.setSprintState(true, this.sprintId);
  }

  onConfirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this task?',
      accept: () => {
        this.onDeleteTask();
      }
    });
  }

  @ViewChild(AppDialog) appDialog!: AppDialog;
  @ViewChild(FormTask) formTask!: FormTask;
  onEditTask() {
    this.appDialog.visible = true;
  }

  onValidateForm() {
    if (this.formTask.formGroup.invalid) {
      this.formTask.formGroup.markAllAsTouched();
      return;
    }
    this.onSaveTask();
  }

  onSaveTask() {
    let values = this.formTask.formGroup.value;
    values.task_description = this.formTask.taskDescription;
    this.taskScrumService
      .update(this.taskID, values)
      .subscribe({
        next: () => {
          this.appDialog.visible = false;
          this.showMessage('success', 'Success', 'Sprint has been updated successfully.');
        }
      });
  }

  onDeleteTask() {
    if (!this.taskID) return;
    this.taskScrumService
      .delete(this.taskID)
      .subscribe({
        next: () => {
          this.projectContent.setBacklogState(false);
          this.showMessage('success', 'Success', 'Task has been deleted successfully.');
        }
      });
  }
}
