import { Component, input } from "@angular/core";

@Component({
  selector: 'c-panelBody',
  standalone: true,
  template: `
    <div [class]="styleClass()">
      <ng-content></ng-content>
    </div>
  `
})
export class ChaosPanelBody {
  title = input<string>('...');
  styleClass = input<string>('p-3');
}