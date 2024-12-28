import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";

@Component({
  selector: 'chaos-print-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="flex flex-wrap align-items-center justify-content-between">
      <div>
        <div class="text-2xl">
          {{ title || 'N/A' }}
        </div>
        <div class="text-gray-500">
          {{ subTitle || '' }}
        </div>
      </div>
      <div>
        <button type="button"
          (click)="onPrint.emit()"
          class="p-button-success p-button-danger p-button-raised"
          label="พิมพ์"
          icon="pi pi-print"
          pButton>
        </button>
      </div>
    </div>
  `
})
export class ChaosPrintToolbar {

  @Input()
  title: string = "พิมพ์เอกสาร";

  @Input()
  subTitle: string = "ตัวอย่างเอกสารก่อนพิมพ์";
  
  @Output()
  onPrint: EventEmitter<void> = new EventEmitter<void>();
  
}