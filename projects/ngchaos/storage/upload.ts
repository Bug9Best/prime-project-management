import { Component, EventEmitter, input, Output, ViewChild } from "@angular/core";
import { FileUpload, FileUploadModule } from "primeng/fileupload";
import { ChaosStorage } from "./storage.service";
import { CStorage } from "./storage.model";
import { MessageService } from "primeng/api";

@Component({
  selector: "c-upload",
  standalone: true,
  imports: [
    FileUploadModule
  ],
  template: `
    <p-fileUpload
      mode="basic"
      name="demo[]"
      [accept]="accept()"
      [auto]="true"
      [maxFileSize]="10000000"
      [multiple]="false"
      [customUpload]="true"
      [hidden]="true"
      (uploadHandler)="onUploader($event)">
    </p-fileUpload>
  
    <button type="button"
      (click)="upload()"
      [class]="styleClass()"
      [label]="label()"
      [icon]="icon()"
      pButton>
    </button>
  `,
})
export class ChaosUpload {

  styleClass = input("p-button-success");
  label = input("อัปโหลด");
  icon = input("pi pi-upload");
  accept = input("application/pdf");
  maxFileSize = input(10000000);

  constructor(
    private messageService: MessageService,
    private storageService: ChaosStorage
  ) {
  
  }
  
  @Output()
  onUpload: EventEmitter<CStorage> = new EventEmitter();
  
  @ViewChild(FileUpload)
  uploader!: FileUpload;
  
  upload(): void {
    this.uploader.onBasicUploaderClick();
  }
  
  onUploader(ev: any): void {
    const files: File[] = ev.files;
    this.uploader.clear();
    this.storageService
      .uploadPrivateFile(files[0])
      .subscribe({
        next: res => {
          this.onUpload.emit(res);
        },
        error: err => {
          this.messageService.add({
            key: 'app',
            severity: 'error',
            summary: 'เอกสาร',
            detail: 'อัปโหลดไม่สำเร็จ'
          });
        }
      });
  }
  
  uploadFile() {
    this.upload();
    return this.onUpload.asObservable();
  }
  
}