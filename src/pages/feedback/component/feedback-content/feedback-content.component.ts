import { Component, Input } from '@angular/core';
import { FeedbackSubmit } from '../../feedback-submit/feedback-submit.component';
import { FeedbackList } from '../../feedback-list/feedback-list.component';

@Component({
  selector: 'feedback-content',
  imports: [
    FeedbackSubmit,
    FeedbackList
  ],
  templateUrl: './feedback-content.component.html',
  styleUrl: './feedback-content.component.scss'
})
export class FeedbackContentPage {

  @Input()
  currentTabIndex: number = 0;
}
