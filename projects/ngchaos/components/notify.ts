import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { OverlayPanel, OverlayPanelModule } from "primeng/overlaypanel";
import { ChaosService } from "ngchaos/api";
import { ChaosThaiDatePipe } from "ngchaos/directive";
import { ChaosSocket } from "ngchaos/socket";
import { BadgeModule } from "primeng/badge";
import { ToastModule } from "primeng/toast";
import { Subscription } from "rxjs";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { CNotificationService } from "ngchaos/api";
import { RouterModule } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: 'c-notify',
  standalone: true,
  imports: [
    CommonModule,
    ChaosThaiDatePipe,
    OverlayPanelModule,
    BadgeModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    RouterModule,
  ],
  styles: `
    .text-title {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
      
      @supports (-webkit-line-clamp: 2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: initial;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    
    ::ng-deep .p-overlaypanel-notify {
      .p-overlaypanel-content {
        padding: 0px;
      }
    }
  `,
  template: `
    
    <ng-template #cMessage>
      <ng-container *ngFor="let notify of listNotifies">
        <div (click)="select(notify)" class="cursor-pointer hover:surface-ground border-bottom-1 border-100">
          <div class="flex align-items-start justify-content-between">
            <div class="p-2">
              <div class="mb-1 text-title">
                {{ notify.title }}
              </div>
              <div class="text-xs text-gray-500">
                {{ notify.created_at | thdate }}
              </div>
            </div>
            
            <div class="m-2 p-1 border-round text-xs surface-50">
              {{ notify.type }}
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
  
    <p-toast 
      [baseZIndex]="9999"
      [title]="'แจ้งเตือน'"
      key="notify" 
      position="bottom-center">
    </p-toast>
    
    <p-overlayPanel
      [appendTo]="'body'"
      [focusOnShow]="false"
      [styleClass]="'p-overlaypanel-notify shadow-3 w-full'"
      [style]="{ maxWidth: '550px' }">
      <div>
        <div class="px-2 py-1 border-bottom-1 border-300 flex align-items-center justify-content-between">
          <div class="font-bold">
            แจ้งเตือน
          </div>
          <div class="flex align-items-center justify-content-between">
            <button type="button"
              [routerLink]="['/main/notify']"
              [style]="{ width: '40px', height: '40px' }"
              class="p-button-text p-button-secondary p-button-rounded"
              icon="pi pi-inbox"
              pButton>
            </button>
            <button type="button"
              (click)="load()"
              [style]="{ width: '40px', height: '40px' }"
              class="p-button-text p-button-secondary p-button-rounded"
              icon="pi pi-sync"
              pButton>
            </button>
          </div>
        </div>
        
        <div>
          <ng-container *ngTemplateOutlet="cMessage"></ng-container>
        </div>
        
      </div>
    </p-overlayPanel>
    
    <div class="p-2 cursor-pointer" (click)="open($event)">
      @if(badge) {
        <i class="pi pi-bell text-xl" pBadge [value]="badge"></i>
      }
      @else {
        <i class="pi pi-bell text-xl"></i>
      }
    </div>
  `
})
export class ChaosNotify{
  
  badge: number = 0;
  
  socket$!: Subscription;
  
  constructor(
    private notifyService: CNotificationService,
    private messageService: MessageService,
    private socket: ChaosSocket,
  ) {
    this.socket$ = this.socket.onNotification.subscribe((res) => {
      this.load();
      this.messageService.clear('notify');
      this.messageService.add({
        key: 'notify',
        severity: 'info',
        summary: 'แจ้งเตือน',
        detail: 'คุณได้รับแจ้งเตือนใหม่'
      });
    });
  }
  
  ngOnInit(): void {
    this.load();
  }
  
  ngOnDestroy(): void {
    this.socket$.unsubscribe();
  }
  
  @ViewChild(OverlayPanel)
  panel!: OverlayPanel;
  
  open(ev: any): void {
    this.panel.toggle(ev);
  }
  
  listNotifies: any[] = [];
  
  load(): void {
    this.notifyService
      .alert()
      .subscribe(res => {
        this.listNotifies = res.data;
        this.badge = res.badge;
      });
  }
  
  @Output()
  onSelect: EventEmitter<any> = new EventEmitter();
  
  select(notify: any): void {
    this.onSelect.emit(notify);
  }
  
}