import { Component, input } from "@angular/core";

@Component({
  selector: 'c-panelToolbar',
  standalone: true,
  template: `
    <div class="border-bottom-1 border-300">
      <div [class]="styleClass()">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ChaosPanelToolbar {
  styleClass = input<string>('p-3');
}