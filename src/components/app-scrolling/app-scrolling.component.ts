import { Component, input } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-scrolling',
  imports: [
    ScrollPanelModule,
  ],
  templateUrl: './app-scrolling.component.html',
  styleUrl: './app-scrolling.component.scss'
})
export class AppScrolling {

  isShowToolbar = input<boolean>(false);
}
