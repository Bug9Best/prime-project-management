import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { AppDialog } from '../../../components/app-dialog/app-dialog.component';
import { FormSprint } from './component/form-sprint/form-sprint.component';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintModel, SprintService } from '../../../services/sprint/sprint.service';
import { AppEmpty } from '../../../components/app-empty/app-empty.component';
import { AppScrolling } from '../../../components/app-scrolling/app-scrolling.component';
import { SprintItem } from './component/sprint-item/sprint-item.component';

@Component({
  selector: 'project-sprint',
  imports: [
    CommonModule,
    AppHeader,
    AppDialog,
    AppEmpty,
    AppScrolling,
    FormSprint,
    SprintItem,
  ],
  templateUrl: './project-sprint.component.html',
  styleUrl: './project-sprint.component.scss'
})
export class ProjectSprint {

  projectID: string = '';
  listSprint: SprintModel[] = [];

  title: string = 'project.title.sprint';
  subtitle: string = 'project.subtitle.sprint';
  labelButton: string = 'project.button.create.sprint';
  labelHeader: string = 'project.header.sprint';
  emptyTitle: string = 'project.empty.sprint.title';
  emptyDescription: string = 'project.empty.sprint.description';

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService,
    private sprintService: SprintService,
  ) {
    this.activateRoute.params
      .subscribe(params => {
        if (!params['id']) return;
        this.projectID = params['id'];
      });
  }

  ngOnInit() {
    this.getSprint();
  }

  getSprint() {
    this.sprintService
      .getProjectSprint(this.projectID)
      .subscribe({
        next: (response: any) => {
          this.listSprint = response;
        },
      });
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
    this.formSprintCreate.formGroup.reset();
  }

  onCancelForm() {
    this.resetForm();
    this.appDialog.visible = false;
  }

  @ViewChild(FormSprint) formSprintCreate!: FormSprint;
  onValidateForm() {
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
          this.appDialog.visible = false;
          this.resetForm();
          this.getSprint();
        },
        error: (error) => {
          console.log(error);
          this.showMessage('error', 'Error', 'Create project failed');
        }
      });
  }
}