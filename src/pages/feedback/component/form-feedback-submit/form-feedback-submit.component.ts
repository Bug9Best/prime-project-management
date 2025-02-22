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


  // resetForm() {
  //   this.formFeedbackSubmit.formGroup.reset();
  // }

  // @ViewChild(FormFeedbackSubmit) formFeedbackSubmit!: FormFeedbackSubmit;
  // onValidateForm() {
  //   if (this.formFeedbackSubmit.formGroup.invalid) {
  //     this.formFeedbackSubmit.formGroup.markAllAsTouched();
  //     return;
  //   }

  //   let values = this.formFeedbackSubmit.formGroup.value;
  //   values.user_id = 1;
  //   this.onSubmitFeeddback(values);
  // }

  // @ViewChild(AppDialog) appDialog!: AppDialog;
  // onSubmitFeeddback(param: any) {
  //   this.feedbackService
  //     .createFeedback(param)
  //     .subscribe({
  //       next: (response: any) => {
  //         this.showMessage('success', 'Success', 'Feedback submitted successfully');
  //         this.appDialog.visible = false;
  //         this.resetForm();
  //         this.getFeedbacks();
  //       },
  //       error: (error: any) => {
  //         this.showMessage('error', 'Error', 'Failed to submit feedback');
  //       }
  //     });
  // }
}
