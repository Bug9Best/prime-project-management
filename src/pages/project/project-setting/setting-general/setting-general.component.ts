import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { ProjectService, ProjectsModel } from '../../../../services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { GeneralForm } from '../component/general-form/general-form.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'setting-general',
  imports: [
    TranslateModule,
    CommonModule,
    AppDialog,
    GeneralForm,
    ImageModule,
    FileUploadModule,
    ScrollPanelModule,
    ButtonModule
  ],
  templateUrl: './setting-general.component.html',
  styleUrl: './setting-general.component.scss'
})
export class SettingGeneral {

  projectID: string = '';
  projectData?: ProjectsModel;

  constructor(
    private activateRoute: ActivatedRoute,
    private messageService: MessageService,
    private projectService: ProjectService,
  ) {
    this.activateRoute.params
      .subscribe((params) => {
        if (params['id']) {
          this.projectID = params['id'];
        }
      });
  }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.projectService
      .getOne(this.projectID)
      .subscribe((project) => {
        this.projectData = project;
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

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.showMessage('success', 'Success', 'Copied to clipboard');
  }

  onBasicUploadAuto(event: any) {
    console.log(event)
    console.log(event.files)
  }

  onEditGeneral() {
    this.appDialog.visible = true;

    if (!this.projectData) return;
    this.generalForm.formGroup.patchValue(this.projectData);
  }

  resetForm() {
    this.generalForm.formGroup.reset();
  }

  onCancelForm() {
    this.appDialog.visible = false;
    this.resetForm();
  }

  @ViewChild(GeneralForm) generalForm!: GeneralForm;
  onValidateForm() {
    if (this.generalForm.formGroup.invalid) {
      this.generalForm.formGroup.markAllAsTouched();
      this.showMessage('warn', 'Error', 'Please fill in all required fields');
      return;
    }

    let values = this.generalForm.formGroup.value;
    this.onEditProject(values);
  }

  @ViewChild(AppDialog) appDialog!: AppDialog;
  onEditProject(values: ProjectsModel) {
    this.projectService
      .update(this.projectID, values)
      .subscribe(() => {
        this.showMessage('success', 'Success', 'Customer created successfully');
        this.appDialog.visible = false;
        this.resetForm();
        this.getProject();
      });
  }
}
