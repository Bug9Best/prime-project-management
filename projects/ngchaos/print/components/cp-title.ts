import { Component, Input } from "@angular/core";

@Component({
  selector: "cp-title",
  standalone: true,
  template: `
    <div class="flex" [style.lineHeight]="lineHeight">
      <span class="font-bold" [style.width]="labelWidth">
        {{ label}}
      </span>
      <span>
        {{ value }}
      </span>
    </div>
  `,
})
export class PrintTitle {

  @Input()
  label: string = "เรื่อง";
  
  @Input()
  value: string = "หัวข้อเรื่อง";

  @Input()
  lineHeight: string = "2.25rem";
  
  @Input()
  labelWidth: string = "5rem";
}