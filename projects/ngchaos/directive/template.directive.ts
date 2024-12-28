import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[cTemplate]'
})
export class ChaosTemplateDirective {

  @Input('cTemplate')
  name: string = "none";

  constructor(public templateRef: TemplateRef<unknown>) { }
  public getType(): string {
    return this.name;
  }
}
