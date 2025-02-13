import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-empty',
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './app-empty.component.html',
  styleUrl: './app-empty.component.scss'
})
export class AppEmpty {

  icon = input<string>('pi pi-info-circle');
  title = input<string>('No data found');
  description = input<string>('No data found');
  isShowToolbar = input<boolean>(false);
}
