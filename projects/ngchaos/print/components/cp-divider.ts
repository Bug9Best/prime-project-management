import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "cp-divider",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [ngClass]="styleClass"
      [style.height]="height">
        &nbsp;
    </div>
  `,
})
export class PrintDivider {

  @Input()
  styleClass: string = "";
  
  @Input()
  height: string = "2rem";

}