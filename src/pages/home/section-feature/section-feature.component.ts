import { Component } from '@angular/core';
import { listProjectFeatures, ProjectFeature } from '../../../../data/project-features';
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

  listFeatures: ProjectFeature[] = listProjectFeatures;
}
