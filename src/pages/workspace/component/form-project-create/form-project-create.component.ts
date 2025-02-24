import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppForm, InputAppForm } from '../../../../components/app-form/app-form.component';
import { FormGroupProjectCreate, listFormProjectCreate } from '../../../../forms/project-create';

@Component({
  selector: 'form-project-create',
  imports: [
    AppForm,
  ],
  templateUrl: './form-project-create.component.html',
  styleUrl: './form-project-create.component.scss'
})
export class FormProjectCreate {

  listForm: InputAppForm[] = listFormProjectCreate;
  formGroup: FormGroup = FormGroupProjectCreate;
  toggleOptions: any[] = [
    { value: 'PRIVATE', label: 'form.project.privacyTypePrivate' },
    { value: 'PUBLIC', label: 'form.project.privacyTypePublic' }
  ]

  @ViewChild(AppForm) AppForm!: AppForm;
  getProjectType(): string {
    return this.AppForm.selectedProjectType;
  }
}
