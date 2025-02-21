import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { ProjectService, ProjectsModel } from '../../../../services/project/project.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'setting-general',
  imports: [
    CommonModule,
    AppDialog,
    ImageModule,
    FileUploadModule,
    ScrollPanelModule,
    ButtonModule
  ],
  templateUrl: './setting-general.component.html',
  styleUrl: './setting-general.component.scss'
})
export class SettingGeneral {

  projectID: string = '';
  projectData?: ProjectsModel;

  constructor(
    private activateRoute: ActivatedRoute,
    private messageService: MessageService,
    private projectService: ProjectService,
  ) {
    this.activateRoute.params
      .subscribe((params) => {
        if (params['id']) {
          this.projectID = params['id'];
        }
      });
  }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.projectService
      .getOne(this.projectID)
      .subscribe((project) => {
        this.projectData = project;
      });
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.showMessage('success', 'Success', 'Copied to clipboard');
  }

  onBasicUploadAuto(event: any) {
    console.log(event)
    console.log(event.files)
  }
}
