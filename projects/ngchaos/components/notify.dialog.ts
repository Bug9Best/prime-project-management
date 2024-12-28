import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { ChaosThaiDatePipe } from "ngchaos/directive";
import { BadgeModule } from "primeng/badge";
import { ToastModule } from "primeng/toast";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";

@Component({
  selector: 'c-notifyDialog',
  standalone: true,
  imports: [
    CommonModule,
    ChaosThaiDatePipe,
    OverlayPanelModule,
    BadgeModule,
    ToastModule,
    ButtonModule,
    DialogModule
  ],
  template: `
    
    <ng-template #cMessage>
      <ng-container *ngFor="let notify of listNotifies">
        <div (click)="select(notify)" class="cursor-pointer hover:bg-gray-50 border-bottom-1 border-100">
          @if (notify.actions?.name) {
            <div class="p-2 text-sm bg-gray-50">
              {{ notify.actions?.name }}
            </div>
          }
          @else {
            <div class="p-2 text-sm bg-gray-50">
              แจ้งเตือน
            </div>
          }
          <div class="p-2">
            <div class="mb-1 text-title">
              {{ notify.title }}
            </div>
            <div class="text-xs text-gray-500">
              {{ notify.created_at | thdate }}
            </div>
          </div>
        </div>
      </ng-container>
      
      <ng-container *ngIf="!listNotifies.length">
        <div class="m-2 p-2 text-gray-500">
          ไม่มีข้อความ
        </div>
      </ng-container>
    </ng-template>
  
    <p-dialog 
      header="แจ้งเตือน"
      contentStyleClass="p-0"
      [closable]="true"
      [style]="{ width: '80vw', height: '80vh' }"
      [modal]="true"
      [draggable]="false"
      [resizable]="false"
      [(visible)]="showDialog">
        <ng-container *ngTemplateOutlet="cMessage"></ng-container>
    </p-dialog>
  `
})
export class ChaosNotifyDialog {
  
  listNotifies: any[] = [];
  showDialog: boolean = false;
  
  open(ev: any): void {
    this.showDialog = true;
    this.listNotifies = ev.data;
  }
  
  @Output()
  onSelect: EventEmitter<any> = new EventEmitter();
  
  select(notify: any): void {
    this.onSelect.emit(notify);
  }
  
}