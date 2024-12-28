import { Component, input } from "@angular/core";

@Component({
  selector: 'c-panelHeader',
  standalone: true,
  template: `
    <div class="border-bottom-1 border-300">
      <div [class]="styleClass()">
        <ng-content>
          <div class="flex align-items-center justify-content-between">
            <div class="text-2xl">
              {{ title() }}
            </div>
            <ng-content></ng-content>
          </div>
        </ng-content>
      </div>
    </div>
  `
})
export class ChaosPanelHeader {
  title = input<string>('...');
  styleClass = input<string>('p-3');
}