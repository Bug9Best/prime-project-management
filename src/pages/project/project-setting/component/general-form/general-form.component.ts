import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppForm } from '../../../../../components/app-form/app-form.component';
import { FormGroupProjectEdit, listFormProjectEdit } from '../../../../../forms/project-edit';

@Component({
  selector: 'general-form',
  imports: [
    AppForm
  ],
  templateUrl: './general-form.component.html',
  styleUrl: './general-form.component.scss'
})
export class GeneralForm {

  listForm = listFormProjectEdit;
  formGroup: FormGroup = FormGroupProjectEdit;
}
