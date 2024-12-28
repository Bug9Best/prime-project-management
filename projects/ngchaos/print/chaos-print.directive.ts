import { Directive, Input, TemplateRef, inject } from "@angular/core";

@Directive({
  selector: '[cPrint]',
  standalone: true
})
export class ChaosPrintDirective {
  @Input('cPrint')
  name: string = "none";
  template = inject(TemplateRef);
  
  public getType(): string {
    return this.name;
  }
  
}