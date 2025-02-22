import { Component, ViewChild } from '@angular/core';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { DividerModule } from 'primeng/divider';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ThaiDatePipe } from '../../../../helper/pipe/thdate.pipe';
import { ProjectTypeTag } from '../project-type-tag/project-type-tag.component';
import { ProjectPrivacyTag } from '../project-privacy-tag/project-privacy-tag.component';

@Component({
  selector: 'project-detail-dialog',
  imports: [
    ThaiDatePipe,
    TranslateModule,
    AppDialog,
    ProjectTypeTag,
    ProjectPrivacyTag,
    DividerModule,
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
  buttonClose: string = 'app.button.close'

  @ViewChild(AppDialog) dialog!: AppDialog;
  showDialog(user_data: any) {
    this.dialog.visible = true;
    this.projectData = user_data;
  }

  closeDialog() {
    this.dialog.visible = false;
  }
}
