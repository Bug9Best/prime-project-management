import { Component, output, ViewChild } from '@angular/core';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { DividerModule } from 'primeng/divider';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ThaiDatePipe } from '../../../../helper/pipe/thdate.pipe';
import { ProjectTypeTag } from '../project-type-tag/project-type-tag.component';
import { ProjectPrivacyTag } from '../project-privacy-tag/project-privacy-tag.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProjectService } from '../../../../services/project/project.service';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'project-detail-dialog',
  imports: [
    ThaiDatePipe,
    TranslateModule,
    AppDialog,
    ProjectTypeTag,
    ProjectPrivacyTag,
    DividerModule,
    MenuModule,
    ButtonModule
  ],
  templateUrl: './project-detail-dialog.component.html',
  styleUrl: './project-detail-dialog.component.scss'
})
export class ProjectDetailDialog {

  projectData?: any = {};
  header: string = 'detail.project.header';
  labelName: string = 'detail.project.name';
  labelDescription: string = 'detail.project.description';
  labelType: string = 'detail.project.type';
  labelOwner: string = 'detail.project.owner';
  labelPrivacyType: string = 'detail.project.privacyType';
  labelPrivacyTypePrivate: string = 'detail.project.privacyTypePrivate';
  labelPrivacyTypePublic: string = 'detail.project.privacyTypePublic';
  labelCreateDate: string = 'detail.project.createDate';
  labelMember: string = 'detail.project.member';
  labelMemberCounting: string = 'detail.project.member_counting';
  labelTask: string = 'detail.project.task';
  labelTaskCounting: string = 'detail.project.taskCounting';
  labelResource: string = 'detail.project.resource';
  labelResourceCounting: string = 'detail.project.resourceCounting';
  buttonOption: string = 'app.button.option';
  buttonArchive: string = 'project.setting.privacy.archive';
  buttonUnArchive: string = 'project.setting.privacy.unarchive';
  buttonDeleteProject: string = 'project.setting.privacy.delete';
  buttonClose: string = 'app.button.close'

  items = [
    {
      icon: 'pi pi-folder-open',
      label: this.buttonArchive,
      command: () => {
        this.archiveProject();
      }
    },
  
    {
      icon: 'pi pi-trash',
      label: this.buttonDeleteProject,
      command: () => {
        this.deleteProject();
      }
    },
  ];

  unItems = [
    {
      icon: 'pi pi-folder',
      label: this.buttonUnArchive,
      command: () => {
        this.unArchiveProject();
      }
    },
    {
      icon: 'pi pi-trash',
      label: this.buttonDeleteProject,
      command: () => {
        this.deleteProject();
      }
    },
  ]

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private projectService: ProjectService
  ) { }


  @ViewChild(AppDialog) dialog!: AppDialog;
  showDialog(user_data: any) {
    this.dialog.visible = true;
    this.projectData = user_data;
  }

  closeDialog() {
    this.dialog.visible = false;
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      key: 'app',
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  archiveProject() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to archive this project?',
      accept: () => {
        this.projectService
          .archiveProject(this.projectData.id)
          .subscribe((res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Project has been unarchived',
            });
            this.dialog.visible = false;
            this.onDeleteProject.emit();
          });
      },
    });
  }

  unArchiveProject() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to unarchive this project?',
      accept: () => {
        this.projectService
          .unArchiveProject(this.projectData.id)
          .subscribe((res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Project has been unarchived',
            });
            this.dialog.visible = false;
            this.onDeleteProject.emit();
          });
      },
    });
  }

  onDeleteProject = output();
  deleteProject() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this project?',
      accept: () => {
        this.projectService.
          delete(this.projectData.id).
          subscribe((res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Project has been deleted',
            });
            this.dialog.visible = false;
            this.onDeleteProject.emit();
          });

      },
    });
  }
}
