import { Component, Input, signal, ViewChild } from '@angular/core';
import { AppBreadcrumb } from '../../../../components/app-breadcrumb/app-breadcrumb.component';
import { TaskScrumModel, TaskScrumService } from '../../../../services/task_scrum/task_scrum.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectContent } from '../../component/project-content/project-content.component';
import { AppScrolling } from '../../../../components/app-scrolling/app-scrolling.component';
import { TaskInfo } from '../component/task-info/task-info.component';
import { TaskControl } from '../component/task-control/task-control.component';
import { DividerModule } from 'primeng/divider';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { FormTask } from '../component/form-task/form-task.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'project-task-detail',
  imports: [
    CommonModule,
    TranslateModule,
    AppBreadcrumb,
    AppDialog,
    FormTask,
    AppScrolling,
    DividerModule,
    TaskInfo,
    TaskControl,
    ButtonModule,
    MenuModule
  ],
  templateUrl: './project-task-detail.component.html',
  styleUrl: './project-task-detail.component.scss'
})
export class ProjectTaskDetail {

  @Input()
  taskID: string = '';
  taskData: TaskScrumModel = <any>{};
  projectType = signal('projectType');


  subtitle: string = 'detail.sprint.description';
  labelButton: string = 'project.button.edit.task';
  labelHeader: string = 'detail.task.header';
  labelSubmit: string = 'app.button.save';

  items = [
    { label: 'detail.task.header', command: () => this.onNavigateToSprintDetail() },
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
    private ProjectContent: ProjectContent,
    private taskScrumService: TaskScrumService
  ) { }

  ngOnInit() {
    this.getTaskData();
  }

  getTaskData() {
    this.taskScrumService
      .getOne(this.taskID)
      .subscribe((data) => {
        this.taskData = data;
        this.items[1].label = this.taskData.task_name;
        this.projectType.set(this.taskData.project_type);
        console.log(this.taskData);
      });
  }

  onNavigateToSprintDetail() {
    this.ProjectContent.setTaskState(false);
  }

  @ViewChild(AppDialog) appDialog!: AppDialog;
  @ViewChild(FormTask) formTask!: FormTask;
  onEditTask() {
    this.appDialog.visible = true;
    this.formTask.formGroup.patchValue(this.taskData);
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
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
    this.taskScrumService
      .update(this.taskID, values)
      .subscribe({
        next: () => {
          this.getTaskData();
          this.appDialog.visible = false;
          this.showMessage('success', 'Success', 'Sprint has been updated successfully.');
        }
      });
  }

  onConfirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this task?',
      accept: () => {
        this.onDeleteTask();
      }
    });
  }

  onDeleteTask() {
    if (!this.taskID) return;
    this.taskScrumService
      .delete(this.taskID)
      .subscribe({
        next: () => {
          this.ProjectContent.setTaskState(false);
          this.showMessage('success', 'Success', 'Task has been deleted successfully.');
        }
      });
  }
}
