import { Component, input } from "@angular/core";

@Component({
  selector: 'c-body',
  standalone: true,
  template: `
    <div class="m-2 border-1 surface-border surface-card">
      <div [class]="styleClass()">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ChaosBody {
  styleClass = input<string>('p-3');
}