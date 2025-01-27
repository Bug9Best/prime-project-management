import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    DividerModule,
    TranslateModule
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeader {

  @Input()
  title: string = 'Default';

  @Input()
  subtitle?: string;
}
