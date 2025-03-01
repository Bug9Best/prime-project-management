import { Component, Input, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AppBreadcrumb } from '../../../../components/app-breadcrumb/app-breadcrumb.component';
import { ProjectContent } from '../../component/project-content/project-content.component';
import { DividerModule } from 'primeng/divider';
import { TabsModule } from 'primeng/tabs';
import { SprintInfo } from '../component/sprint-info/sprint-info.component';
import { SprintTaskList } from '../component/sprint-task-list/sprint-task-list.component';
import { SprintControl } from '../component/sprint-control/sprint-control.component';
import { SprintModel, SprintService } from '../../../../services/sprint/sprint.service';
import { ButtonModule } from 'primeng/button';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { FormSprint } from '../component/form-sprint/form-sprint.component';
import { MessageService } from 'primeng/api';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'project-sprint-detail',
  imports: [
    CommonModule,
    TranslateModule,
    AppBreadcrumb,
    AppDialog,
    DividerModule,
    TabsModule,
    SprintInfo,
    SprintTaskList,
    SprintControl,
    ButtonModule,
    FormSprint,
    ScrollPanelModule
  ],
  templateUrl: './project-sprint-detail.component.html',
  styleUrl: './project-sprint-detail.component.scss'
})
export class ProjectSprintDetail {

  @Input()
  sprintID: string = '';
  sprintData: SprintModel = <any>{};
  subtitle: string = 'detail.sprint.description';
  labelButton: string = 'project.button.edit.sprint';
  labelHeader: string = 'detail.sprint.header';
  labelSubmit: string = 'app.button.save';

  items = [
    { label: 'detail.sprint.header', command: () => this.onNavigateToSprintDetail('1') },
    { label: '' },
  ];

  constructor(
    private messageService: MessageService,
    private ProjectContent: ProjectContent,
    private sprintService: SprintService
  ) { }

  ngOnInit() {
    this.getSPrintData();
  }

  @ViewChild(SprintInfo) sprintInfo!: SprintInfo;
  getSPrintData() {
    this.sprintService
      .getOne(this.sprintID)
      .subscribe((data) => {
        this.sprintData = data;
        this.sprintInfo.setSprintData(data);
        this.items[1].label = data.sprint_name;
      });
  }

  onNavigateToSprintDetail(sprintID: string) {
    this.ProjectContent.setSprintState(false);
  }

  @ViewChild(AppDialog) appDialog!: AppDialog;
  @ViewChild(FormSprint) formSprint!: FormSprint;
  onEditSprint() {
    this.appDialog.visible = true;
    this.formSprint.formGroup.patchValue(this.sprintData);
    this.formSprint.formGroup.get('start_date')?.patchValue(new Date(this.sprintData.start_date));
    this.formSprint.formGroup.get('end_date')?.patchValue(new Date(this.sprintData.end_date));
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
    if (this.formSprint.formGroup.invalid) {
      this.formSprint.formGroup.markAllAsTouched();
      return;
    }
    this.onSaveSprint();
  }

  onSaveSprint() {
    let values = this.formSprint.formGroup.value;
    values.start_date = new Date(values.start_date).toLocaleDateString();
    values.end_date = new Date(values.end_date).toLocaleDateString();
    this.sprintService
      .update(this.sprintID, values)
      .subscribe({
        next: () => {
          this.getSPrintData();
          this.appDialog.visible = false;
          this.showMessage('success', 'Success', 'Sprint has been updated successfully.');
        }
      });
  }
}
