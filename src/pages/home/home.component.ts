import { Component, inject } from '@angular/core';
import { SectionNavigate } from './section-navigate/section-navigate.component';
import { SectionGetstart } from './section-getstart/section-getstart.component';
import { SectionFeature } from './section-feature/section-feature.component';
import { SectionDeveloper } from './section-devloper/section-developer.component';
import { environment } from '../../environments/environment';
import { SectionFooter } from './section-footer/section-footer.component';
import { ProjectService } from '../../services/project/project.service';
import { AuthService } from '../../services/auth/auth.service';

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

  auth = inject(AuthService);
  onSignin(): void {
    window.location.href = "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=1023079733198-12k3qr9hjj73q8ng8cb7ltgmkrtsrvc1.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fprime.it.kmitl.ac.th%2Fauth%2Fgoogle-callback&scope=openid%20profile%20email&response_type=code&state=W6WbRyHy7TMqtECdXSlzQ2jBSeJe6PZRFTkKuRWO&service=lso&o2v=1&ddm=1&flowName=GeneralOAuthFlow";
    // window.location.href = environment.authenUrl;
    // this.auth.signinWithGoogle().subscribe((res) => {
    //   window.location.href = res.redirect_uri;
    // });
  }

  ngOnInit(): void {
    this.getProjects();
  }

  projectService = inject(ProjectService);
  getProjects(): void {
    this.projectService.getAll().subscribe((projects) => {
      console.log(projects);
    });
  }

  onScrollToElementEvent(element: string): void {
    const targetElement = document.getElementById(element);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
