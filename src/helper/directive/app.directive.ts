import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appTemplate]'
})
export class AppDirective {

  @Input('appTemplate')
  name: string = "none";

  constructor(public templateRef: TemplateRef<unknown>) { }
  public getType(): string {
    return this.name;
  }
}
