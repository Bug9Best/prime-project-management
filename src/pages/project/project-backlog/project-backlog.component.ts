import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { DividerModule } from 'primeng/divider';
import { TranslateModule } from '@ngx-translate/core';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FormsModule } from '@angular/forms';
import { DndDropEvent, DndModule } from 'ngx-drag-drop';
import { MessageService } from 'primeng/api';
import { SprintModel, SprintService, SprintStatus } from '../../../services/sprint/sprint.service';
import { TaskScrumModel, TaskScrumService } from '../../../services/task_scrum/task_scrum.service';
import { AppEmpty } from '../../../components/app-empty/app-empty.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project/project.service';
import { TaskWaterfallService } from '../../../services/task_waterfall/task_waterfall.service';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { AuthService } from '../../../services/auth/auth.service';
import { AppDialog } from '../../../components/app-dialog/app-dialog.component';
import { FormSprint } from '../project-sprint/component/form-sprint/form-sprint.component';
import { FormTask } from '../project-task/component/form-task/form-task.component';

@Component({
  selector: 'project-backlog',
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    FormSprint,
    FormTask,
    AppHeader,
    AppDialog,
    AppEmpty,
    PanelModule,
    DividerModule,
    ScrollPanelModule,
    DndModule,
    TagModule,
    ProgressBarModule
  ],
  templateUrl: './project-backlog.component.html',
  styleUrl: './project-backlog.component.scss'
})
export class ProjectBacklog {

  SprintStatus = SprintStatus
  currentUser: any = null;

  title: string = 'project.title.backlog';
  subtitle: string = 'project.subtitle.backlog';
  labelSprint: string = 'project.title.sprint';
  labelSprintDescription: string = 'project.description.sprint';
  labelSprintButton: string = 'project.button.create.sprint';
  labelSprintHeader: string = 'project.header.sprint';

  labelTask: string = 'project.title.task';
  labelTaskDescription: string = 'project.description.task';
  labelTaskButton: string = 'project.button.create.task';
  labelTaskHeader: string = 'project.header.task';

  emptyTaskTitle: string = 'project.empty.task.title';
  emptyTaskDescription: string = 'project.empty.task.description';
  emptySprintTitle: string = 'project.empty.sprint.title';
  emptySprintDescription: string = 'project.empty.sprint.description';

  projectID: string = '';
  projectData: any = [];
  projectType: string = '';
  listSprint: SprintModel[] = [];
  listTask: TaskScrumModel[] = [];
  selectedTask: TaskScrumModel = <any>{};

  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private taskScrumService: TaskScrumService,
    private taskWaterfallService: TaskWaterfallService,
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.projectID = params.get('id')!;
        this.getProject();
      }
    });

    this.currentUser = this.auth.getUserData();
  }

  getProject() {
    this.projectService.getOne(this.projectID)
      .subscribe((response: any) => {
        this.projectData = response;
        this.projectType = this.projectData.project_type;
      });
  }

  ngOnInit() {
    this.getOpenSprint();
    this.getOpenTask();
  }

  getOpenSprint() {
    this.sprintService.
      getProjectOpenSprint(this.projectID)
      .subscribe({
        next: (response: any) => {
          this.listSprint = response;
        },
      });
  }

  getOpenTask() {
    switch (this.projectType) {
      case 'SCRUM':
        this.getTaskScrum();
        break;
      case 'WATERFALL':
        this.getTaskWaterfall();
        break;
      default:
        this.getTaskScrum();
        break;
    }
  }

  getTaskScrum() {
    this.taskScrumService
      .getProjectOpenTask(this.projectID).subscribe({
        next: (response: any) => {
          this.listTask = response;
        },
      });
  }

  getTaskWaterfall() {
    this.taskWaterfallService
      .getProjectOpenTask(this.projectID).subscribe({
        next: (response: any) => {
          this.listTask = response;
        },
      });
  }

  getSprintProgress(sprint: SprintModel): number {
    if (!sprint) return 0;
    let total = sprint.total_tasks || 1;
    let completed = sprint.completed_tasks || 0;
    let progress = Math.ceil((completed / total) * 100);
    return progress;
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
    console.log('Dragged task', item);
    this.selectedTask = item;
    const index = this.listTask.indexOf(item);
    this.listTask.splice(index, 1);
  }

  onDropTask(event: DndDropEvent) {
    console.log('Dropped task', event);
    if (this.listTask) {
      let index = event.index;

      if (typeof index === 'undefined') {
        index = this.listTask.length;
      }
      this.listTask.splice(index, 0, event.data);
    }
  }

  onDropToSprint(event: DndDropEvent, sprint: any) {
    setTimeout(() => {
      if (this.selectedTask === null) return;

      let values = <any>{};
      values.task_id = this.selectedTask.id;
      values.sprint_id = sprint.id;
      values.user_id = this.currentUser.id;
      this.selectedTask = <any>null;

      this.taskScrumService
        .moveToSprint(values)
        .subscribe({
          next: (response: any) => {
            this.showMessage('success', 'Success', 'Task has been moved to sprint');
            this.getOpenTask();
            this.getOpenSprint();
          },
          error: (error: any) => {
            this.showMessage('error', 'Error', 'Failed to move task to sprint');
          },
        });
    }, 100);
  }

  resetFormSprint() {
    this.formSprintCreate.formGroup.reset();
  }

  @ViewChild('dialogSprint') dialogSprint!: AppDialog;
  onCancelFormSprint() {
    this.dialogSprint.visible = false;
    this.resetFormSprint();
  }

  @ViewChild(FormSprint) formSprintCreate!: FormSprint;
  onValidateFormSprint() {
    if (this.formSprintCreate.formGroup.invalid) {
      this.formSprintCreate.formGroup.markAllAsTouched();
      return;
    }

    let values = this.formSprintCreate.formGroup.value;
    values.project_id = this.projectID;
    this.onCreateSprint(values);
  }

  @ViewChild(AppDialog) appDialog!: AppDialog;
  onCreateSprint(param: any) {
    param.start_date = new Date(param.start_date).toLocaleDateString();
    param.end_date = new Date(param.end_date).toLocaleDateString();
    this.sprintService
      .create(param)
      .subscribe({
        next: (response) => {
          this.showMessage('success', 'Success', 'Create project successfully');
          this.dialogSprint.visible = false;
          this.resetFormSprint();
          this.getOpenSprint();
        },
        error: (error) => {
          console.log(error);
          this.showMessage('error', 'Error', 'Create project failed');
        }
      });
  }

  resetFormTask() {
    this.formTask.formGroup.reset();
  }

  @ViewChild('dialogTask') dialogTask!: AppDialog;
  onCancelFormTask() {
    this.dialogTask.visible = false;
    this.resetFormTask();
  }

  @ViewChild(FormTask) formTask!: FormTask;
  onValidateFormTask() {
    if (this.formTask.formGroup.invalid) {
      this.formTask.formGroup.markAllAsTouched();
      return;
    }

    let values = this.formTask.formGroup.value;
    values.project_id = this.projectID;
    values.user_id = this.currentUser.id;
    this.onCreateTask(values);
  }

  onCreateTask(param: any) {
    this.taskScrumService
      .create(param)
      .subscribe({
        next: (response) => {
          this.showMessage('success', 'Success', 'Create task successfully');
          this.dialogTask.visible = false;
          this.resetFormTask();
          this.getOpenTask();
        },
        error: (error) => {
          console.log(error);
          this.showMessage('error', 'Error', 'Create task failed');
        }
      });
  }
}
