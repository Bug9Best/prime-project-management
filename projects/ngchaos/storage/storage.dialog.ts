import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChaosTableColumn } from 'ngchaos/table';
import { CStorage } from './storage.model';
import { ChaosStorage } from './storage.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ChaosThemeModule } from 'ngchaos/theme';
import { ChaosUpload } from './upload';


@Component({
  selector: 'c-storageDialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChaosThemeModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    SplitButtonModule,
    SelectButtonModule,
    ChaosUpload
  ],
  template: `
    <chaos-dialog
      header="จัดการไฟล์"
      contentStyleClass="p-3"
      [modal]="true"
      [style]="{ width: '80vw', maxWidth: '1200px' }"
      [(visible)]="showDialog">
      
      <div class="mb-3 flex align-items-center">
        <div class="mr-2">
          <input type="text"
            [formControl]="searchControl"
            [style]="{ width: '300px' }"
            class="bg-yellow-50"
            placeholder="ค้นหา..."
            pInputText>
        </div>

        <ng-container *ngIf="!readOnly">
          <div class="ml-auto">
            <c-upload 
              (onUpload)="onUpload.emit([$event])"
              styleClass="p-button-success p-button-rounded p-button-raised">
            </c-upload>
          </div>
        </ng-container>
      </div>
      
      <div class="border-1 border-300" [style]="{ height: '50vh', overflow: 'auto' }">
        
        <div>
          <chaos-table
            [columns]="columns"
            [value]="filterValues">
            
            <ng-template cTableField="name" let-item>
              <div (click)="download(item)" class="cursor-pointer text-lg text-blue-600 hover:text-blue-800">
                <i class="pi pi-file"></i>
                <span> {{ item.name }} </span>
              </div>
            </ng-template>
            
            <ng-template cTableField="size" let-item>
              {{ formatBytes(item.size) }}
            </ng-template>
            
            <ng-template cTableField="control" let-item>
              <button type="button"
                (click)="download(item)"
                class="p-button-success p-button-rounded p-button-text"
                icon="pi pi-download"
                pButton>
              </button>
              <ng-container *ngIf="!readOnly">
                <button type="button"
                  (click)="remove(item)"
                  class="p-button-secondary p-button-rounded p-button-text"
                  icon="pi pi-trash"
                  pButton>
                </button>
              </ng-container>
            </ng-template>
            
          </chaos-table>
        </div>
        
        <ng-container *ngIf="!filterValues.length">
          <div class="p-5 text-center text-gray-400">
            ไม่พบข้อมูล
          </div>
        </ng-container>
          
      </div>
      
      <ng-template cTemplate="footer">
        <div>
          <button type="button"
            (click)="close()"
            class="p-button-secondary p-button-rounded p-button-text"
            label="ยกเลิก"
            pButton>
          </button>
        </div>
        <div class="ml-auto">
          <button type="button"
            [disabled]="!values.length"
            (click)="downloadZip()"
            class="p-button-secondary p-button-rounded p-button-text mr-1"
            label="ดาวน์โหลดทั้งหมด"
            icon="far fa-file-zipper"
            pButton>
          </button>
        </div>
      </ng-template>
      
    </chaos-dialog>
  `,
})
export class ChaosStorageDialog {

  @Input()
  readOnly: boolean = false;
  
  @Input()
  columns: ChaosTableColumn[] = [
    {
      type: 'string',
      label: 'รายการ',
      field: 'name',
      style: { minWidth: '280px' }
    },
    {
      type: 'string',
      label: 'ชนิดไฟล์',
      field: 'extension',
      style: { width: '150px', textAlign: 'right' }
    },
    {
      type: 'string',
      label: 'ขนาดไฟล์',
      field: 'size',
      style: { width: '150px', textAlign: 'right' }
    },
    {
      type: 'control',
      label: '',
      field: 'control',
      style: { width: '150px', textAlign: 'right' }
    }
  ];
  
  @Input()
  values: CStorage[] = [];
  filterValues: CStorage[] = [];
  
  modeOptions: any[] = [
    { icon: 'pi pi-list', value: 'list' },
    { icon: 'pi pi-image', value: 'image' }
  ];
  
  mode: string = 'list';
  showDialog: boolean = false;
  
  storageService = inject(ChaosStorage);
  
  open(): void {
    this.showDialog = true;
  }
  
  close(): void {
    this.showDialog = false;
  }
  
  formatBytes(bytes: number, decimals: number = 2): string {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }
  
  isImage(item: CStorage): boolean {
    return item.extension === 'jpg' 
      || item.extension === 'jpeg' 
      || item.extension === 'png'
      || item.extension === 'gif';
  }
  
  searchControl: FormControl = new FormControl('');
  
  constructor() {
    this.searchControl.valueChanges.subscribe(value => {
      this.search();
    });
  }
  
  ngOnChanges(): void {
    if(this.values) {
      this.filterValues = this.values;
    }
  }
  
  search(): void {
    this.filterValues = this.values.filter(item => {
      return item.name.includes(this.searchControl.value);
    });
  }
  
  clearText(): void {
    this.searchControl.setValue('');
    this.filterValues = this.values;
  }
  
  @Output()
  onUpload: EventEmitter<(CStorage|null)[]> = new EventEmitter();
  
  @Output()  
  onRemove: EventEmitter<CStorage> = new EventEmitter();
  
  @ViewChild(ChaosUpload)
  uploader!: ChaosUpload;
  
  upload(): void {
    this.uploader.upload();
  }
  
  remove(item: CStorage) {
    this.onRemove.emit(item);
  }
  
  download(item: CStorage) {
    this.storageService
      .downloadFile(item.url, item.name)
      .subscribe();
  }
  
  downloadZip(): void {
    this.storageService
      .downloadZipFile(this.values)
      .subscribe();
  }
  
  openImage(item: CStorage): void {
    this.storageService
      .openFile(item.url)
      .subscribe();
  }
  
}
