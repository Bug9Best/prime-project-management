import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackPage } from './feedback/feedback.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbackPage
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FeedbackModule { }
