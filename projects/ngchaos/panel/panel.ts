import { Component, input } from "@angular/core";

@Component({
  selector: 'c-panel',
  standalone: true,
  template: `
    <div [class]="styleClass()">
      <ng-content></ng-content>
    </div>
  `
})
export class ChaosPanel {
  styleClass = input<string>('m-2 border-1 border-300 bg-white');
}