import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "cp-textBlock",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [ngClass]="styleClass"
      [style.margin-bottom]="marginBottom"
      [style.line-height]="lineHeight"
      [style.text-justify]="textJustify"
      [style.text-align]="textAlignment" 
      [style.text-indent]="textIndent">
        <ng-content></ng-content>
    </div>
  `,
})
export class PrintTextBlock {

  @Input()
  textIndent: string = "2.5cm";

  @Input()
  textAlignment: string = "justify";

  @Input()
  textJustify: string = "inter-character";
  
  @Input()
  lineHeight: string = "1.75rem";
  
  @Input()
  marginBottom: string = "1.5rem";
  
  @Input()
  styleClass: string = "";

}