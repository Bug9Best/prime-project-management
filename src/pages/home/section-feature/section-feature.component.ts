import { Component } from '@angular/core';
import { listProjectFeatures, ProjectFeature } from '../../../../public/data/project-features';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'section-feature',
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './section-feature.component.html',
  styleUrl: './section-feature.component.scss'
})
export class SectionFeature {

  title: string = 'home.feature.title';
  subtitle: string = "home.feature.subtitle";
  description: string = "home.feature.description";

  listFeatures: ProjectFeature[] = listProjectFeatures;
}
