import { Component } from '@angular/core';
import { SectionNavigate } from './section-navigate/section-navigate.component';
import { SectionGetstart } from './section-getstart/section-getstart.component';
import { SectionFeature } from './section-feature/section-feature.component';
import { SectionDeveloper } from './section-devloper/section-developer.component';
import { environment } from '../../environments/environment';
import { SectionFooter } from './section-footer/section-footer.component';

@Component({
  selector: 'home-page',
  imports: [
    SectionNavigate,
    SectionGetstart,
    SectionFeature,
    SectionDeveloper,
    SectionFooter
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
