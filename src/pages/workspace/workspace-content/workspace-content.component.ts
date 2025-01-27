import { Component, Input } from '@angular/core';
import { WorkspaceContentProject } from '../workspace-content-project/workspace-content-project.component';
import { WorkspaceContentMember } from '../workspace-content-member/workspace-content-member.component';
import { WorkspaceContentJoin } from '../workspace-content-join/workspace-content-join.component';

@Component({
  selector: 'workspace-content',
  imports: [
    WorkspaceContentProject,
    WorkspaceContentJoin,
    WorkspaceContentMember
  ],
  templateUrl: './workspace-content.component.html',
  styleUrl: './workspace-content.component.scss'
})
export class WorkspaceContentPage {

  @Input()
  currentTabIndex: number = 0;
}
