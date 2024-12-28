import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "cp-signature",
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <div class="text-center" [style]="{ lineHeight: '1.25rem' }" [style.fontSize]="fontSize" [style.width]="width">
      <ng-container *ngIf="showHeader">
        <div class="mb-3">
          ขอแสดงความนับถือ
        </div>
      </ng-container>
      <ng-container *ngIf="prefix">
        <div>
          {{ prefix }}
        </div>
      </ng-container>
      <div [style.marginTop]="marginTop">
        ( {{ name }} )
      </div>
      <div>
        {{ position }}
      </div>
    </div>
  `,
})
export class PrintSignature {

  @Input()
  showHeader: boolean = false;

  @Input()
  name: string = "เรื่อง";
  
  @Input()
  position: string = "ตำแหน่ง";
  
  @Input()
  prefix?: string;
  
  @Input()
  width: string = "5cm";
  
  @Input()
  fontSize: string = "16pt";

  @Input()
  marginTop: string = "3rem";
}