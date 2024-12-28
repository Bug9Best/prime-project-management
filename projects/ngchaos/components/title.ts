import { Component, input } from "@angular/core";

@Component({
  selector: 'c-title',
  standalone: true,
  template: `
    <div class="my-3 p-2 surface-groud">
      <div [class]="styleClass()">
        <div class="flex align-items-center justify-content-between">
          <div>
            <div class="text-2xl">
              {{ title() || '...' }}
            </div>
            <div class="text-gray-500">
              {{ subTitle() || '' }}
            </div>
          </div>
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class ChaosTitle {
  title = input<string>();
  subTitle = input<string>();
  styleClass = input<string>('');
}