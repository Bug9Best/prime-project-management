import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeader } from '../../../../components/app-header/app-header.component';
import { AppScrolling } from '../../../../components/app-scrolling/app-scrolling.component';
import { AppEmpty } from '../../../../components/app-empty/app-empty.component';
import { FeedbackModel, FeedbackService } from '../../../../services/feedback/feedback.service';

@Component({
  selector: 'feedback-list',
  imports: [
    CommonModule,
    AppHeader,
    AppScrolling,
    AppEmpty,
  ],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.scss'
})
export class FeedbackList {

  title: string = 'feedback.title.list';
  subtitle: string = 'feedback.subtitle.list';
  emptyTitle: string = 'feedback.feedbackEmpty.title';
  emptyDescription: string = 'feedback.feedbackEmpty.description';

  listFeedbacks: FeedbackModel[] = [];

  constructor(
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
      });
  }
}
