import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';

@Component({
  selector: 'project-resource',
  imports: [
    CommonModule,
    AppHeader,
  ],
  templateUrl: './project-resource.component.html',
  styleUrl: './project-resource.component.scss'
})
export class ProjectResource {

  title: string = 'PROJECT_MENU_RESOURCE_TITLE';
  subtitle: string = 'PROJECT_MENU_RESOURCE_SUBTITLE';
}
