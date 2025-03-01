import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { TableModule } from 'primeng/table';
import { AppFilter } from '../../../components/app-filter/app-filter.component';
import { AppDialog } from '../../../components/app-dialog/app-dialog.component';
import { Mode } from '../../workspace/workspace-content-project/workspace-content-project.component';
import { ButtonModule } from 'primeng/button';
import { AppEmpty } from '../../../components/app-empty/app-empty.component';
import { FormTask } from './component/form-task/form-task.component';
import { TaskModel, TaskService } from '../../../services/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppTable, AppTableColumn, AppTableFieldDirective } from '../../../components/app-table/app-table.component';
import { ProjectTaskDetail } from './project-task-detail/project-task-detail.component';
import { ProjectContent } from '../component/project-content/project-content.component';
import { TagType } from './component/tag-type/tag-type.component';
import { TagPriority } from './component/tag-priority/tag-priority.component';
import { TagStatus } from './component/tag-status/tag-status.component';

@Component({
  selector: 'project-task',
  imports: [
    CommonModule,
    AppHeader,
    AppFilter,
    AppDialog,
    AppEmpty,
    ButtonModule,
    TableModule,
    FormTask,
    AppTable,
    AppTableFieldDirective,
    TagType,
    TagPriority,
    TagStatus
  ],
  templateUrl: './project-task.component.html',
  styleUrl: './project-task.component.scss'
})
export class ProjectTask {

  projectID: string = '';
  listTask: TaskModel[] = [];
  tempListTask: TaskModel[] = [];
  grouplistTask: { [key: string]: TaskModel[] } = {};

  mode: Mode = 'NONE';
  isOnSearch = false;
  isShowToolbar = false;
  sortValue = 'NONE';
  groupValue = 'NONE';

  title: string = 'project.title.task';
  subtitle: string = 'project.subtitle.task';
  labelCreate: string = 'project.button.create.task';
  labelHeader: string = 'project.header.task';
  emptyTitle: string = 'project.empty.task.title';
  emptyDescription: string = 'project.empty.task.description';

  listColumns: AppTableColumn[] = [
    { field: 'task_name', label: 'Task name', type: 'string', style: { minWidth: '500px' } },
    { field: 'task_type', label: 'Type', type: 'string', style: { minWidth: '10rem' } },
    { field: 'task_priority', label: 'Priority', type: 'string', style: { minWidth: '10rem' } },
    { field: 'assignee', label: 'Assignee', type: 'string', style: { minWidth: '300px' } },
    { field: 'estimate_time', label: 'Estimate Time', type: 'string', style: { minWidth: '200px' } },
    { field: 'actual_time', label: 'Actual Time', type: 'string', style: { minWidth: '200px' } },
    { field: 'status', label: 'Status', type: 'string', style: { minWidth: '10rem' } },
  ]

  constructor(
    private activateRoute: ActivatedRoute,
    private messageService: MessageService,
    private taskService: TaskService
  ) {
    this.activateRoute.params
      .subscribe(params => {
        if (!params['id']) return;
        this.projectID = params['id'];
      });
  }

  ngOnInit() {
    this.getTask();
  }

  getTask() {
    this.taskService
      .getProjectTask(this.projectID)
      .subscribe({
        next: (response: any) => {
          this.listTask = response;
          this.tempListTask = response;
        },
      });
  }

  onSearch(event: any): void {
    if (!event || event.trim() === '') {
      this.isOnSearch = false;
      this.listTask = [...this.tempListTask];
      // if (this.mode === 'GROUP') {
      //   this.grouplistUser = this.groupByType(this.templistUser);
      // }
      // return;
    }

    const searchTerm = event.toLowerCase().trim();
    this.isOnSearch = true;

    // if (this.mode === 'GROUP') {
    //   const filteredList = this.templistUser.filter((item) =>
    //     item.full_name.toLowerCase().includes(searchTerm) ||
    //     item.email.toLowerCase().includes(searchTerm)
    //   );
    //   this.grouplistUser = this.groupByType(filteredList);
    // } else {
    this.listTask = this.tempListTask.filter((item) =>
      item.task_name.toLowerCase().includes(searchTerm)
    );
    // }
  }

  setSortValue(event: any): void {
    this.sortValue = event.value;

    const sortBy: Record<string, (a: any, b: any) => number> = {
      'NAME_ASC': (a, b) => a.task_name.localeCompare(b.task_name),
      'NAME_DESC': (a, b) => b.task_name.localeCompare(a.project_name),
      'TYPE_ASC': (a, b) => a.task_type.localeCompare(b.task_type),
      'TYPE_DESC': (a, b) => b.task_type.localeCompare(a.task_type),
      'DATE_ASC': (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      'DATE_DESC': (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    };

    const sortFunction = sortBy[this.sortValue];
    const defaultSort = (a: any, b: any) => a.id - b.id;

    if (this.sortValue === 'NONE') {
      if (this.mode === 'GROUP') {
        Object.keys(this.grouplistTask).forEach(key => {
          this.grouplistTask[key]?.sort(defaultSort);
        });
      } else {
        this.listTask.sort(defaultSort);
      }
    } else if (sortFunction) {
      if (this.mode === 'GROUP') {
        Object.keys(this.grouplistTask).forEach(key => {
          this.grouplistTask[key]?.sort(sortFunction);
        });
      }
      this.listTask.sort(sortFunction);
    }
  }

  setGroupValue(event: any) {
    this.groupValue = event.value;
    switch (this.groupValue) {
      case 'NONE':
        this.mode = 'NONE';
        this.listTask = this.isOnSearch ? this.listTask : this.tempListTask;
        if (this.sortValue !== 'NONE') { this.setSortValue({ value: this.sortValue }) }
        break;
      case 'TYPE':
        this.mode = 'GROUP';
        this.grouplistTask = this.groupByType(this.isOnSearch ? this.listTask : this.tempListTask);
        if (this.sortValue !== 'NONE') { this.setSortValue({ value: this.sortValue }) }
        break;
      case 'PRIORITY':
        this.mode = 'GROUP';
        this.grouplistTask = this.groupByPriority(this.isOnSearch ? this.listTask : this.tempListTask);
        if (this.sortValue !== 'NONE') { this.setSortValue({ value: this.sortValue }) }
        break;
      case 'STATUS':
        this.mode = 'GROUP';
        this.grouplistTask = this.groupByStatus(this.isOnSearch ? this.listTask : this.tempListTask);
        if (this.sortValue !== 'NONE') { this.setSortValue({ value: this.sortValue }) }
        break;
      default:
        break;
    }
  }

  groupByType(items: any[]): { [key: string]: any[] } {
    return items.reduce((acc, item) => {
      const typeKey = item.project_type.split(' ')[0];
      acc[typeKey] = acc[typeKey] || [];
      acc[typeKey].push(item);
      return acc;
    }, {} as { [key: string]: any[] });
  }

  groupByPriority(items: any[]): { [key: string]: any[] } {
    return items.reduce((acc, item) => {
      const priorityKey = item.task_priority.split(' ')[0];
      acc[priorityKey] = acc[priorityKey] || [];
      acc[priorityKey].push(item);
      return acc;
    }, {} as { [key: string]: any[] });
  }

  groupByStatus(items: any[]): { [key: string]: any[] } {
    return items.reduce((acc, item) => {
      const statusKey = item.status.split(' ')[0];
      acc[statusKey] = acc[statusKey] || [];
      acc[statusKey].push(item);
      return acc;
    }, {} as { [key: string]: any[] });
  }

  projectContent = inject(ProjectContent);
  onClickItem(task: any) {
    this.projectContent.setTaskState(true, task.id);
  }

  showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  resetForm() {
    this.formTask.formGroup.reset();
  }

  onCancelForm() {
    this.appDialog.visible = false;
    this.resetForm();
  }

  @ViewChild(FormTask) formTask!: FormTask;
  onValidateForm() {
    if (this.formTask.formGroup.invalid) {
      this.formTask.formGroup.markAllAsTouched();
      return;
    }

    let values = this.formTask.formGroup.value;
    values.project_id = this.projectID;
    this.onCreateTask(values);
  }

  @ViewChild(AppDialog) appDialog!: AppDialog;
  onCreateTask(param: any) {
    this.taskService
      .create(param)
      .subscribe({
        next: (response) => {
          this.showMessage('success', 'Success', 'Create task successfully');
          this.appDialog.visible = false;
          this.resetForm();
          this.getTask();
        },
        error: (error) => {
          console.log(error);
          this.showMessage('error', 'Error', 'Create task failed');
        }
      });
  }
}
