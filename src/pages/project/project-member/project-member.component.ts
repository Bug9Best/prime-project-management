import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { ProjectMemberInvite } from './project-member-invite/project-member-invite.component';
import { ProjectMemberItem } from './project-member-item/project-member-item.component';
import { AppDialog } from '../../../components/app-dialog/app-dialog.component';
import { listMember } from '../../../../public/data/member';
import { AppScrolling } from '../../../components/app-scrolling/app-scrolling.component';

@Component({
  selector: 'project-member',
  imports: [
    CommonModule,
    AppHeader,
    AppDialog,
    AppScrolling,
    ProjectMemberInvite,
    ProjectMemberItem,
  ],
  templateUrl: './project-member.component.html',
  styleUrl: './project-member.component.scss'
})
export class ProjectMember {

  title: string = 'PROJECT_MENU_MEMBER_TITLE';
  subtitle: string = 'PROJECT_MENU_MEMBER_SUBTITLE';

  listMember: any = listMember;

  onValidateForm() {
  }
}
