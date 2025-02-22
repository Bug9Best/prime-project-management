import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { listProjectContributes, ProjectContribute } from '../../../../public/data/project-ontributes';
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

  title: string = 'team.title';
  description: string = "team.description";

  listProjectContributes: ProjectContribute[] = listProjectContributes;
}
