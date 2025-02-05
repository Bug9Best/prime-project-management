import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppForm, InputAppForm } from '../../../../components/app-form/app-form.component';
import { FormGroupFeedbackSubmit, listFormFeedbackSubmit } from '../../../../forms/feedback-submit';

@Component({
  selector: 'form-feedback-submit',
  imports: [
    AppForm,
  ],
  templateUrl: './form-feedback-submit.component.html',
  styleUrl: './form-feedback-submit.component.scss'
})
export class FormFeedbackSubmit {

  listForm: InputAppForm[] = listFormFeedbackSubmit;
  formGroup: FormGroup = FormGroupFeedbackSubmit;
}
