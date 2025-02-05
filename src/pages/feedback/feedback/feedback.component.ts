import { Component } from '@angular/core';
import { FeedbackTopbar } from '../component/feedback-topbar/feedback-topbar.component';
import { FeedbackSidebar } from '../component/feedback-sidebar/feedback-sidebar.component';
import { FeedbackContentPage } from '../component/feedback-content/feedback-content.component';

@Component({
  selector: 'feedback-page',
  imports: [
    FeedbackTopbar,
    FeedbackSidebar,
    FeedbackContentPage
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackPage {

  currentTabIndex: number = 0;

  onChangeTabIndex(index: any): void {
    this.currentTabIndex = index;
  }
}
