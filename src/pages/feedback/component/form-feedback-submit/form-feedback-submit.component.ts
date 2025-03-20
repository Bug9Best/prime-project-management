import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppForm, InputAppForm } from '../../../../components/app-form/app-form.component';
import { FormGroupFeedbackSubmit, listFormFeedbackSubmit } from '../../../../forms/feedback-submit';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'form-feedback-submit',
  imports: [
    AppForm,
    FormsModule,
    ReactiveFormsModule,
    EditorModule
  ],
  templateUrl: './form-feedback-submit.component.html',
  styleUrl: './form-feedback-submit.component.scss'
})
export class FormFeedbackSubmit {

  listForm: InputAppForm[] = listFormFeedbackSubmit;
  formGroup: FormGroup = FormGroupFeedbackSubmit;

  formContent: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required)
  });
}
