import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

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

  title = 'getStart.title';
  description = 'getStart.description';
  buttonLabel = 'getStart.buttonLabel';

  router = inject(Router);
  getStarted() {
    this.router.navigate(['/workspace']);
  }
}
