import { Component, ContentChildren, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ChaosTemplateDirective } from 'ngchaos/directive';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'chaos-dialog',
  templateUrl: './chaos-dialog.component.html',
  styleUrl: './chaos-dialog.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule
  ],
})
export class ChaosDialog {

  @Input()
  focusOnShow: boolean = false;
  
  @Input()
  autofocus: boolean = false;

  @Input()
  header?: string;

  @Input()
  subHeader?: string;

  @Input()
  icon: string = "";

  @Input()
  contentStyleClass: string = "p-0";

  @Input()
  headerStyleClass: string = "p-3";

  @Input()
  footerStyleClass: string = "flex align-items-center justify-content-end";

  @Input()
  style: any = { minWidth: '100px', minHeight: '100px' };

  @Input()
  data: any;

  @Input()
  draggable: boolean = false;

  @Input()
  dismissableMask: boolean = true;

  @Input()
  modal: boolean = true;

  @Input()
  appendTo: string = 'body';

  @Input()
  showHeader: boolean = true;

  @Input()
  showSubHeader: boolean = true;

  @Input()
  showEdit: boolean = false;

  @Input()
  showTrash: boolean = false;

  @Input()
  showClose: boolean = true;

  @Input()
  showBack: boolean = false;

  @Input()
  showButton: boolean = true;

  @Input()
  visible: boolean = false;

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  onCloseClick: EventEmitter<void> = new EventEmitter();

  @Output()
  onEditClick: EventEmitter<any> = new EventEmitter();

  @Output()
  onTrashClick: EventEmitter<any> = new EventEmitter();

  @Output()
  onBackClick: EventEmitter<any> = new EventEmitter();

  @ViewChild(Dialog)
  dialog!: Dialog;

  constructor() {

  }

  onShow(): void {
    this.visible = true;
    this.visibleChange.emit(this.visible);
  }

  onClose(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.onCloseClick.emit();
  }

  show(): void {
    this.onShow();
  }
  
  hide(): void {
    this.onClose();
  }

  close() {
    return new Observable<boolean>(observer => {
      this.dialog.onHide.subscribe(() => {
        observer.next(true);
        observer.complete();
      });
      this.visible = false;
      this.visibleChange.emit(this.visible);
    });
  }

  @ContentChildren(ChaosTemplateDirective)
  templates: ChaosTemplateDirective[] = [];

  footerTemplate?: TemplateRef<any>;

  ngAfterContentInit(): void {
    this.templates.forEach(template => {
      let type = template.getType();
      switch(type) {
        case "footer":
          this.footerTemplate = template.templateRef;
          break;
      }
    })
  }

}
