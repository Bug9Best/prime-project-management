import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'section-getstart',
  imports: [
    CommonModule,
    ButtonModule,
    TranslateModule
  ],
  templateUrl: './section-getstart.component.html',
  styleUrl: './section-getstart.component.scss'
})
export class SectionGetstart {

  title = 'home.getStart.title';
  description = 'home.getStart.description';
  buttonLabel = 'home.getStart.buttonLabel';

  auth = inject(AuthService);
  router = inject(Router);
  getStarted() {
    let user = this.auth.getUserData();
    console.log(user);
    user ? this.router.navigate(['/workspace']) : this.showMessage('info', 'Info', 'Please sign in to get started');
  }

  messageService = inject(MessageService);
  showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }
}
