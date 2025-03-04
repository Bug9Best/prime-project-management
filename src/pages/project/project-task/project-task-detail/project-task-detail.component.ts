import { Component, Input, ViewChild } from '@angular/core';
import { AppBreadcrumb } from '../../../../components/app-breadcrumb/app-breadcrumb.component';
import { TaskModel, TaskService } from '../../../../services/task/task.service';
import { MessageService } from 'primeng/api';
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
    ButtonModule
  ],
  templateUrl: './project-task-detail.component.html',
  styleUrl: './project-task-detail.component.scss'
})
export class ProjectTaskDetail {

  @Input()
  taskID: string = '';
  taskData: TaskModel = <any>{};
  subtitle: string = 'detail.sprint.description';
  labelButton: string = 'project.button.edit.task';
  labelHeader: string = 'detail.task.header';
  labelSubmit: string = 'app.button.save';

  items = [
    { label: 'detail.task.header', command: () => this.onNavigateToSprintDetail() },
    { label: '' },
  ];

  constructor(
    private messageService: MessageService,
    private ProjectContent: ProjectContent,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.getTaskData();
  }

  getTaskData() {
    this.taskService
      .getOne(this.taskID)
      .subscribe((data) => {
        this.taskData = data;
        this.items[1].label = this.taskData.task_name;
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
    this.taskService
      .update(this.taskID, values)
      .subscribe({
        next: () => {
          this.getTaskData();
          this.appDialog.visible = false;
          this.showMessage('success', 'Success', 'Sprint has been updated successfully.');
        }
      });
  }
}
