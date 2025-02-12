import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { ProjectMemberPosition } from '../project-member-position/project-member-position.component';
import { AppDialog } from '../../../../components/app-dialog/app-dialog.component';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'project-member-detail',
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    AppDialog,
    DrawerModule,
    AvatarModule,
    ButtonModule,
    ProjectMemberPosition
  ],
  templateUrl: './project-member-detail.component.html',
  styleUrl: './project-member-detail.component.scss'
})
export class ProjectMemberDetail {


  member: any;
  visible: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
  ) { }

  removeMember(item: any) {
    this.confirmationService.confirm({
      message: 'Do you want to remove this member from project?',
      rejectButtonStyleClass: 'p-button-text p-button-danger p-button-sm',
      acceptButtonStyleClass: 'p-button-sm',
      accept: () => {
        this.visible = false;
      }
    });
  }

  onValidateForm() {

  }
}
