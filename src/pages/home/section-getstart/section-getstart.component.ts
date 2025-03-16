import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  title = 'home.getStart.title';
  description = 'home.getStart.description';
  buttonLabel = 'home.getStart.buttonLabel';
}
