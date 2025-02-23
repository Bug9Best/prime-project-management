import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppForm, InputAppForm } from '../../../../../components/app-form/app-form.component';
import { FormGroupSprintCreate, listFormSprintCreate } from '../../../../../forms/sprint-create';

@Component({
  selector: 'form-sprint-create',
  imports: [
    AppForm,
  ],
  templateUrl: './form-sprint-create.component.html',
  styleUrl: './form-sprint-create.component.scss'
})
export class FormSprintCreate {

  listForm: InputAppForm[] = listFormSprintCreate;
  formGroup: FormGroup = FormGroupSprintCreate;
}
