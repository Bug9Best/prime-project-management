import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';

@Component({
  selector: 'project-board',
  imports: [
    CommonModule,
    AppHeader,
  ],
  templateUrl: './project-board.component.html',
  styleUrl: './project-board.component.scss'
})
export class ProjectBoard {

  title: string = 'PROJECT_MENU_BOARD_TITLE';
  subtitle: string = 'PROJECT_MENU_BOARD_SUBTITLE';
}
