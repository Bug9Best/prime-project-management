import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';

@Component({
  selector: 'project-member',
  imports: [
    CommonModule,
    AppHeader,
  ],
  templateUrl: './project-member.component.html',
  styleUrl: './project-member.component.scss'
})
export class ProjectMember {

  title: string = 'PROJECT_MENU_MEMBER_TITLE';
  subtitle: string = 'PROJECT_MENU_MEMBER_SUBTITLE';
}
