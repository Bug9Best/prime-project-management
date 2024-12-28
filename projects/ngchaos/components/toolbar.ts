import { Component, input } from "@angular/core";

@Component({
  selector: 'c-toolbar',
  standalone: true,
  template: `
    <div class="m-2 p-3 border-1 border-300 bg-white">
      <div [class]="styleClass()">
        <div class="flex align-items-center justify-content-between">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class ChaosToolbar {
  styleClass = input<string>('');
}