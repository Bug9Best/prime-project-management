import { Component } from '@angular/core';
import { listProjectFeatures } from '../../../../data/project-features';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'section-feature',
  imports: [
    TranslateModule
  ],
  templateUrl: './section-feature.component.html',
  styleUrl: './section-feature.component.scss'
})
export class SectionFeature {

  listFeatures = listProjectFeatures;
}
