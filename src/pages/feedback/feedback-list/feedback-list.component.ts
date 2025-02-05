import { Component, ViewChild } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { AppDialog } from '../../../components/app-dialog/app-dialog.component';
import { FormFeedbackSubmit } from '../component/form-feedback-submit/form-feedback-submit.component';
import { FeedbackModel, FeedbackService } from '../../../services/feedback/feedback.service';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { AppScrolling } from '../../../components/app-scrolling/app-scrolling.component';

@Component({
  selector: 'feedback-list',
  imports: [
    CommonModule,
    AppHeader,
    AppDialog,
    AppScrolling,
    FormFeedbackSubmit,
    TableModule
  ],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss'
})
export class FeedbackList {

  title: string = 'Feedback List';
  subtitle: string = 'List of feedbacks';

  listFeedbacks: FeedbackModel[] = [];

  constructor(
    private messageService: MessageService,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit() {
    this.getFeedbacks();
  }

  getFeedbacks() {
    this.feedbackService
      .getAll()
      .subscribe({
        next: (response: any) => {
          this.listFeedbacks = response.data;
        },
        error: (error: any) => {
          this.showMessage('error', 'Error', 'Failed to get feedbacks');
        }
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
    this.formFeedbackSubmit.formGroup.reset();
  }

  @ViewChild(FormFeedbackSubmit) formFeedbackSubmit!: FormFeedbackSubmit;
  onValidateForm() {
    if (this.formFeedbackSubmit.formGroup.invalid) {
      this.formFeedbackSubmit.formGroup.markAllAsTouched();
      return;
    }

    let values = this.formFeedbackSubmit.formGroup.value;
    values.user_id = 1;
    this.onSubmitFeeddback(values);
  }

  @ViewChild(AppDialog) appDialog!: AppDialog;
  onSubmitFeeddback(param: any) {
    this.feedbackService
      .createFeedback(param)
      .subscribe({
        next: (response: any) => {
          this.showMessage('success', 'Success', 'Feedback submitted successfully');
          this.appDialog.visible = false;
          this.resetForm();
          this.getFeedbacks();
        },
        error: (error: any) => {
          this.showMessage('error', 'Error', 'Failed to submit feedback');
        }
      });
  }
}
