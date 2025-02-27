import { Component } from '@angular/core';
import { SprintModel } from '../../../../../services/sprint/sprint.service';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'sprint-info',
  imports: [
    TranslateModule,
    CommonModule,
    DividerModule,
    ButtonModule
  ],
  templateUrl: './sprint-info.component.html',
  styleUrl: './sprint-info.component.scss'
})
export class SprintInfo {

  sprintData?: SprintModel = <any>{};

  setSprintData(sprint_data: SprintModel) {
    this.sprintData = sprint_data;
  }
}
