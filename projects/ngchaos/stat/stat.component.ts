import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'chaos-stat',
  template: `
    <div [ngClass]="styleClass" [style]="style">
      <div [ngClass]="labelStyleClass">
        {{ label || "N/A" }}
      </div>
      <div [ngClass]="valueStyleClass">
        {{ value }}
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class ChaosStat {

  @Input()
  style: any = { minWidth: '250px' }

  @Input()
  styleClass: string = 'p-3 shadow-1 bg-white border-1 border-200 w-full';

  @Input()
  label: string = 'Label';

  @Input()
  labelStyleClass: string = 'py-1 text-sm text-gray-500';

  @Input()
  value: string|number = 0;

  @Input()
  valueStyleClass: string = 'py-1 text-green-500 text-3xl';
}
