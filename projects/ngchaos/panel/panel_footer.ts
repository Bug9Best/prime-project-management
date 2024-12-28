import { Component, input } from "@angular/core";

@Component({
  selector: 'c-panelFooter',
  standalone: true,
  template: `
    <div class="border-top-1 border-300">
      <div [class]="styleClass()">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ChaosPanelFooter {
  styleClass = input<string>('p-3');
}