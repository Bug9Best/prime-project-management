import { Component, Input, signal, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { AppBreadcrumb } from '../../../../components/app-breadcrumb/app-breadcrumb.component';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { AppScrolling } from '../../../../components/app-scrolling/app-scrolling.component';
import { FormTask } from '../../project-task/component/form-task/form-task.component';
import { TaskControl } from '../../project-task/component/task-control/task-control.component';
import { TaskInfo } from '../../project-task/component/task-info/task-info.component';
import { BoardTaskModel, BoardTaskService } from '../../../../services/board-task/board-task.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectContent } from '../../component/project-content/project-content.component';

@Component({
  selector: 'board-detail',
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
  templateUrl: './board-detail.component.html',
  styleUrl: './board-detail.component.scss'
})
export class BoardDetail {

  @Input()
  taskID: string = '';
  taskData: any = <any>{};
  projectType = signal('KANBAN');

  subtitle: string = 'detail.sprint.description';
  labelButton: string = 'project.button.edit.task';
  labelHeader: string = 'detail.task.header';
  labelSubmit: string = 'app.button.save';

  items = [
    { label: 'detail.board.header', command: () => this.onNavigateToBoardDetail() },
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
    private boardTaskService: BoardTaskService
  ) { }

  ngOnInit() {
    this.getTaskData();
  }

  getTaskData() {
    this.boardTaskService
      .getOne(this.taskID)
      .subscribe((data) => {
        this.taskData = data;
        this.items[1].label = this.taskData.task_name;
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

  onNavigateToBoardDetail() {
    this.projectContent.setBoardState(false);
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
    this.boardTaskService
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
    this.boardTaskService
      .delete(this.taskID)
      .subscribe({
        next: () => {
          this.projectContent.setBacklogState(false);
          this.showMessage('success', 'Success', 'Task has been deleted successfully.');
        }
      });
  }
}
