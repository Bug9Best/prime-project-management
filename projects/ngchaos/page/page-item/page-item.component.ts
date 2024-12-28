import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'c-pageItem',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './page-item.component.html',
  styleUrl: './page-item.component.scss'
})
export class PageItemComponent {
  @Output()
  onSelect: EventEmitter<void> = new EventEmitter();

  @Input()
  icon?: string;

  @Input()
  label?: string;
}
