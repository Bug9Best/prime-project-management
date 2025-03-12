import { Component, Input, signal, ViewChild } from '@angular/core';
import { AppBreadcrumb } from '../../../../components/app-breadcrumb/app-breadcrumb.component';
import { ProjectContent } from '../../component/project-content/project-content.component';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { MenuModule } from 'primeng/menu';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TaskScrumModel, TaskScrumService } from '../../../../services/task_scrum/task_scrum.service';
import { FormTask } from '../../project-task/component/form-task/form-task.component';
import { AppScrolling } from '../../../../components/app-scrolling/app-scrolling.component';
import { TaskInfo } from '../../project-task/component/task-info/task-info.component';
import { TaskControl } from '../../project-task/component/task-control/task-control.component';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'project-backlog-task',
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
  templateUrl: './project-backlog-task.component.html',
  styleUrl: './project-backlog-task.component.scss'
})
export class ProjectBacklogTask {

  @Input()
  taskID: string = '';
  taskData: TaskScrumModel = <any>{};
  projectType = signal('projectType');


  subtitle: string = 'detail.sprint.description';
  labelButton: string = 'project.button.edit.task';
  labelHeader: string = 'detail.task.header';
  labelSubmit: string = 'app.button.save';

  items = [
    { label: 'detail.backlog.header', command: () => this.onNavigateToBacklogDetail() },
    { label: 'detail.task.header', command: () => this.onNavigateToTaskDetail() },
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
        this.items[2].label = this.taskData.task_name;
        this.projectType.set(this.taskData.project_type);
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

  onNavigateToBacklogDetail() {
    this.projectContent.setBacklogState(false);
  }

  onNavigateToTaskDetail() {
    this.projectContent.onSetTabIndex(5);
    this.projectContent.setTaskState(false);
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
