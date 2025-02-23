import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeader } from '../../../components/app-header/app-header.component';
import { ProjectMemberInvite } from './project-member-invite/project-member-invite.component';
import { ProjectMemberItem } from './project-member-item/project-member-item.component';
import { AppDialog } from '../../../components/app-dialog/app-dialog.component';
import { AppScrolling } from '../../../components/app-scrolling/app-scrolling.component';
import { AppFilter } from '../../../components/app-filter/app-filter.component';

@Component({
  selector: 'project-member',
  imports: [
    CommonModule,
    AppHeader,
    AppDialog,
    AppFilter,
    AppScrolling,
    ProjectMemberInvite,
    ProjectMemberItem,
  ],
  templateUrl: './project-member.component.html',
  styleUrl: './project-member.component.scss'
})
export class ProjectMember {

  isShowToolbar = false;

  title: string = 'project.title.member';
  subtitle: string = 'project.subtitle.member';

  onSearch(event: any): void {
    console.log(event);
  }

  setSortValue(event: any): void {
  }

  onValidateForm() {
  }
}
