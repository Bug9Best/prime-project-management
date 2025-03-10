import { Component, inject, Input, output, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TaskScrumModel, TaskScrumService } from '../../../../../services/task_scrum/task_scrum.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { listTaskPriority, TaskPriority } from '../../../../../../public/data/task-priority';
import { listTaskType, TaskType } from '../../../../../../public/data/task-type';
import { SprintService } from '../../../../../services/sprint/sprint.service';
import { listTaskStatus, TaskStatus } from '../../../../../../public/data/task-status';
import { TagStatus } from '../tag-status/tag-status.component';
import { TagPriority } from '../tag-priority/tag-priority.component';
import { TagType } from '../tag-type/tag-type.component';
import { AuthService } from '../../../../../services/auth/auth.service';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ProjectService } from '../../../../../services/project/project.service';

@Component({
  selector: 'task-control',
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    DatePickerModule,
    SelectModule,
    ButtonModule,
    TagPriority,
    TagType,
    TagStatus,
    KeyFilterModule
  ],
  templateUrl: './task-control.component.html',
  styleUrl: './task-control.component.scss'
})
export class TaskControl {

  currentUser: any = {};
  allowCharacters = /[0-9hHmM]/;

  @Input()
  taskData: TaskScrumModel = <any>{};
  listMember: any[] = [];
  listSprint: any[] = [];
  listTaskType: TaskType[] = listTaskType;
  listTaskPriority: TaskPriority[] = listTaskPriority;
  listTaskStatus: TaskStatus[] = listTaskStatus;

  formGroup: FormGroup = new FormGroup({
    user_id: new FormControl(null),
    sprint_id: new FormControl(null),
    task_type: new FormControl(null),
    task_priority: new FormControl(null),
    start_date: new FormControl(null),
    end_date: new FormControl(null),
    estimate_time: new FormControl(null),
    actual_time: new FormControl(null),
    status: new FormControl(null)
  });

  isEditing: { [key: string]: boolean } = {
    assignee: false,
    sprint: false,
    task_type: false,
    task_priority: false,
    start_date: false,
    end_date: false,
    estimate_time: false,
    actual_time: false,
    status: false
  };

  constructor(
    private auth: AuthService,
    private projectService: ProjectService,
    private sprintService: SprintService,
  ) {
    this.currentUser = this.auth.getUserData();
  }

  ngOnChanges(changes: SimpleChanges) {
    let task = changes['taskData'].currentValue;
    if (!task) return;
    this.getMemberList();
    this.getSprintList();
  }

  getMemberList() {
    if (!this.taskData.project_id) return;
    this.projectService.getProjectMembers(this.taskData.project_id)
      .subscribe({
        next: (data) => {
          this.listMember = data;
        }
      });
  }

  getSprintList() {
    if (!this.taskData.project_id) return;
    this.sprintService.getProjectSprint(this.taskData.project_id)
      .subscribe({
        next: (data) => {
          this.listSprint = data;
        }
      });
  }

  editField(field: string) {
    if (this.isEditing[field]) {
      this.isEditing[field] = false;
    } else {
      for (let key in this.isEditing) {
        if (this.isEditing.hasOwnProperty(key)) {
          this.isEditing[key] = false;
        }
      }
      this.isEditing[field] = true;
    }
    this.resetForm(field);
  }

  resetForm(field: string) {
    this.formGroup.get(field)?.reset();
  }

  resetFormGroup() {
    this.formGroup.reset();
  }

  resetField() {
    for (let key in this.isEditing) {
      if (this.isEditing.hasOwnProperty(key)) {
        this.isEditing[key] = false;
      }
    }
  }

  messageService = inject(MessageService);
  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  onSelect() {
    let values = this.formGroup.value;
    values.id = this.taskData.id;
    values.user_id = this.currentUser.id;

    const filteredData: Record<string, any> = {};
    Object.keys(values).forEach(key => {
      const controlValue = values[key];
      if (controlValue !== null && controlValue !== '') {
        filteredData[key] = controlValue;
      }
    });

    this.onUpdateTask(filteredData);
  }

  onSelectDate() {
    let values = this.formGroup.value;
    values.id = this.taskData.id;
    values.user_id = this.currentUser.id;
    values.start_date = (values.start_date) ? new Date(values.start_date).toLocaleDateString() : null;
    values.end_date = (values.end_date) ? new Date(values.end_date).toLocaleDateString() : null;

    const filteredData: Record<string, any> = {};
    Object.keys(values).forEach(key => {
      const controlValue = values[key];
      if (controlValue !== null && controlValue !== '') {
        filteredData[key] = controlValue;
      }
    });

    this.onUpdateTask(filteredData);
  }

  taskService = inject(TaskScrumService);
  onUpdateTaskEvent = output<void>();
  onUpdateTask(data: any) {
    this.taskService.update(data.id, data)
      .subscribe({
        next: () => {
          this.onUpdateTaskEvent.emit();
          this.resetField();
          this.resetFormGroup();
          this.showMessage('success', 'Update Task', 'Update task successfully');
        },
        error: () => {
          this.showMessage('error', 'Update Task', 'Update task failed');
        }
      }
      );
  }

  onAssign() {
    let values = <any>{};
    values.task_id = this.taskData.id;
    values.user_id = this.formGroup.get('user_id')?.value;

    this.taskService
      .assignTask(values)
      .subscribe({
        next: () => {
          this.onUpdateTaskEvent.emit();
          this.resetField();
          this.resetFormGroup();
          this.showMessage('success', 'Update Task', 'Update task successfully');
        },
        error: () => {
          this.showMessage('error', 'Update Task', 'Update task failed');
        }
      });
  }

  assignYourself() {
    let values = <any>{};
    values.task_id = this.taskData.id;
    values.user_id = this.currentUser.id;

    this.taskService
      .assignTask(values)
      .subscribe({
        next: () => {
          this.onUpdateTaskEvent.emit();
          this.resetField();
          this.resetFormGroup();
          this.showMessage('success', 'Assign Task', 'Assign task successfully');
        },
        error: () => {
          this.showMessage('error', 'Assign Task', 'Assign task failed');
        }
      });
  }
}
