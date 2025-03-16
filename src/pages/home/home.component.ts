import { Component, inject } from '@angular/core';
import { SectionNavigate } from './section-navigate/section-navigate.component';
import { SectionGetstart } from './section-getstart/section-getstart.component';
import { SectionFeature } from './section-feature/section-feature.component';
import { SectionDeveloper } from './section-devloper/section-developer.component';
import { environment } from '../../environments/environment';
import { SectionFooter } from './section-footer/section-footer.component';
import { ProjectService } from '../../services/project/project.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

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

  authService = inject(AuthService);
  router = inject(Router);
  onSignin(payload: any): void {
    this.authService
      .signinWithGoogle(payload)
      .subscribe((res) => {
        let token = res.token
        if (!token) {
          this.router.navigate(['/home']);
        } else {
          this.authService.setToken(token);
          this.authService.setUserData(res.jwt);
          this.router.navigate(['/workspace']);
        }
      });
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
