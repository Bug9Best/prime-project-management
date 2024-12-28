import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({
  standalone: true,
  selector: '[cTableField]'
})
export class ChaosTableFieldDirective {

  @Input('cTableField')
  name: string = "default";

  constructor(public templateRef: TemplateRef<any>) { }
  public getName(): string {
    return this.name;
  }
}