import { Component, output } from '@angular/core';

@Component({
  selector: 'c-pageToggle',
  standalone: true,
  imports: [],
  templateUrl: './page-toggle.component.html',
  styleUrl: './page-toggle.component.scss'
})
export class PageToggleComponent {
  open = output();
}
