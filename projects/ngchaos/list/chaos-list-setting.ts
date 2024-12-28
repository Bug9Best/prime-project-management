import { Component, Input } from '@angular/core';

@Component({
  selector: 'c-listSetting',
  standalone: true,
  template: `
    <div class="p-3 flex align-items-start justify-content-between border-bottom-1 border-200">
      <div>
        <div [class]="titleStyleClass" [class.required]="required">
          {{ title }}
        </div>
        <div [class]="subTitleStyleClass">
          {{ subTitle }}
        </div>
      </div>
      <div>
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class ChaosListSetting {

  @Input()
  title: string = 'Title';

  @Input()
  titleStyleClass: string = "text-lg font-bold";

  @Input()
  subTitle: string = '';

  @Input()
  subTitleStyleClass: string = "text-sm text-gray-500";
  
  @Input()
  required: boolean = false;

}
