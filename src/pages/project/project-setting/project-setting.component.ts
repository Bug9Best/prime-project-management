import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';

@Component({
  selector: 'project-setting',
  imports: [
    CommonModule,
    AppHeader,
  ],
  templateUrl: './project-setting.component.html',
  styleUrl: './project-setting.component.scss'
})
export class ProjectSetting {

  title: string = 'PROJECT_MENU_SETTING_TITLE';
  subtitle: string = 'PROJECT_MENU_SETTING_SUBTITLE';
}
