import { Component, inject, ViewChild } from '@angular/core';
import { SectionNavigate } from './components/section-navigate/section-navigate.component';
import { SectionGetstart } from './components/section-getstart/section-getstart.component';
import { SectionFeature } from './components/section-feature/section-feature.component';
import { SectionDeveloper } from './components/section-devloper/section-developer.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'home-page',
  imports: [
    SectionNavigate,
    SectionGetstart,
    SectionFeature,
    SectionDeveloper,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomePage {

  onSignin(): void {
    window.location.href = environment.authenUrl;
  }

  onSignUp(): void {
    window.location.href = environment.signupUrl;
  }

  onScrollToElementEvent(element: string): void {
    const targetElement = document.getElementById(element);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
