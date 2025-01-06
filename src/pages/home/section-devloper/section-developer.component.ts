import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { listProjectContributes, ProjectContribute } from '../../../../data/project-ontributes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'section-developer',
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './section-developer.component.html',
  styleUrl: './section-developer.component.scss'
})
export class SectionDeveloper {

  listProjectContributes: ProjectContribute[] = listProjectContributes;
}
