import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { BoardList } from './board-list/board-list.component';
import { ScrollerModule } from 'primeng/scroller';

@Component({
  selector: 'project-board',
  imports: [
    CommonModule,
    AppHeader,
    BoardList,
    ScrollerModule
  ],
  templateUrl: './project-board.component.html',
  styleUrl: './project-board.component.scss'
})
export class ProjectBoard {

  title: string = 'project.title.board';
  subtitle: string = 'project.subtitle.board';

  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  constructor() { }
}
