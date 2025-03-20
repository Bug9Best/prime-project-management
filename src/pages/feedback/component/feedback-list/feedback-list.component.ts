import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeader } from '../../../../components/app-header/app-header.component';
import { AppScrolling } from '../../../../components/app-scrolling/app-scrolling.component';
import { AppEmpty } from '../../../../components/app-empty/app-empty.component';
import { FeedbackModel, FeedbackService } from '../../../../services/feedback/feedback.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { FormFeedbackSubmit } from '../form-feedback-submit/form-feedback-submit.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'feedback-list',
  imports: [
    CommonModule,
    TranslateModule,
    AppHeader,
    AppDialog,
    AppScrolling,
    AppEmpty,
    FormFeedbackSubmit,
    ButtonModule
  ],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss'
})
export class FeedbackList {

  currentUserData?: any;
  isUser: boolean = false;

  title: string = 'feedback.title.admin';
  subtitle: string = 'feedback.subtitle.admin';
  emptyTitle: string = 'feedback.feedbackEmptyAdmin.title';
  emptyDescription: string = 'feedback.feedbackEmptyAdmin.description';
  labelButton: string = 'feedback.button.submit';
  labelHeader: string = 'feedback.header.submit';
  labelSubmit: string = 'app.button.submit';
  labelFormDescription: string = 'form.feedback.description';

  listFeedbacks: FeedbackModel[] = [];

  constructor(
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private feedbackService: FeedbackService
  ) {
    this.isUser = this.authService.isUser();
    this.currentUserData = this.authService.getUserData();
    if (this.isUser) {
      this.title = 'feedback.title.user';
      this.subtitle = 'feedback.subtitle.user';
      this.emptyTitle = 'feedback.feedbackEmptyUser.title';
      this.emptyDescription = 'feedback.feedbackEmptyUser.description';
    }
  }

  ngOnInit() {
    if (this.isUser) {
      this.getFeedbacks();
    } else {
      this.getAllFeedbacks();
    }
  }

  getFeedbacks() {
    this.feedbackService
      .getByUser(this.currentUserData.id)
      .subscribe({
        next: (response: any) => {
          this.listFeedbacks = response;
        },
      });
  }

  getAllFeedbacks() {
    this.feedbackService
      .getAll()
      .subscribe({
        next: (response: any) => {
          this.listFeedbacks = response;
        },
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
    values.user_id = this.currentUserData.id;
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

  onDeleteFeedback(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this feedback?',
      accept: () => {
        this.feedbackService
          .delete(id)
          .subscribe({
            next: (response: any) => {
              this.showMessage('success', 'Success', 'Feedback deleted successfully');
              this.getFeedbacks();
            },
            error: (error: any) => {
              this.showMessage('error', 'Error', 'Failed to delete feedback');
            }
          });
      }
    });
  }
}
