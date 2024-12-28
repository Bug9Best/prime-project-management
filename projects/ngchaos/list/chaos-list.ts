import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface CListItem {
  title: string;
  subTitle?: string;
  titleStyleClass?: string;
  subTitleStyleClass?: string;
  text?: string;
}

@Component({
  selector: 'c-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <div class="my-3 border-top-1 border-300">
      <ng-container *ngFor="let item of value">
        <div class="flex align-items-center justify-content-between py-2 border-bottom-1 border-300">
          <div>
            <div [class]="item.titleStyleClass">
              {{ item.title }}
            </div>
            <div [class]="item.subTitleStyleClass">
              {{ item.subTitle || "" }}
            </div>
          </div>
          <ng-container *ngIf="item.text">
            <div>
              {{ item.text }}
            </div>
          </ng-container>
        </div>
      </ng-container>
    </div>
  `
})
export class ChaosList {

  @Input()
  value: CListItem[] = [];

}
