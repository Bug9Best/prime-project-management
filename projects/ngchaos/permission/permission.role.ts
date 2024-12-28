import { Directive, ElementRef, Input, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { ChaosPermission } from './permission';

@Directive({
  selector: '[cPermissionRole]'
})
export class ChaosPermissionRole {

  @Input()
  cPermissionRole: string|string[] = [];

  @Input()
  cPermissionRoleElse: TemplateRef<any>|null = null;

  constructor(
    private data: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permission: ChaosPermission
  ) {

  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.updateView();
  }

  private updateView() {
    if(!this.view()) {
      this.viewElse();
      return;
    }

    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private view(): boolean {
    return this.permission.role(this.cPermissionRole);
  }

  private viewElse() {
    if(this.cPermissionRoleElse) {
      this.viewContainer.createEmbeddedView(this.cPermissionRoleElse);
      return;
    }

    this.viewContainer.clear();
  }

}
