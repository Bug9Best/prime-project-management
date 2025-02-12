import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';

@Component({
  selector: 'setting-general',
  imports: [
    CommonModule,
    AppDialog,
    ImageModule,
    FileUploadModule,
    ScrollPanelModule
  ],
  templateUrl: './setting-general.component.html',
  styleUrl: './setting-general.component.scss'
})
export class SettingGeneral {

  onBasicUploadAuto(event: any) {
    console.log(event)
    console.log(event.files)
  }
}
