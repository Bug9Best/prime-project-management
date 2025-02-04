import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'setting-notification',
  imports: [
    CommonModule,
    FormsModule,
    SelectButtonModule,
  ],
  templateUrl: './setting-notification.component.html',
  styleUrl: './setting-notification.component.scss'
})
export class SettingNotification {

  value1: string = 'off';
  value2: string = 'off';
  stateOptions: any[] = [
    { label: 'Off', value: 'off' },
    { label: 'On', value: 'on' }
  ];
}
