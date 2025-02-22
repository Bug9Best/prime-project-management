import { Component, Input } from '@angular/core';
import { WorkspaceContentProject } from '../../workspace-content-project/workspace-content-project.component';
import { WorkspaceContentJoin } from '../../workspace-content-join/workspace-content-join.component';
import { WorkspaceManageUser } from '../../workspace-manage-user/workspace-manage-user.component';
import { WorkspaceManageProject } from '../../workspace-manage-project/workspace-manage-project.component';
import { FormFeedbackSubmit } from '../../../feedback/component/form-feedback-submit/form-feedback-submit.component';

@Component({
  selector: 'workspace-content',
  imports: [
    WorkspaceContentProject,
    WorkspaceContentJoin,
    WorkspaceManageProject,
    WorkspaceManageUser,
    FormFeedbackSubmit
  ],
  templateUrl: './workspace-content.component.html',
  styleUrl: './workspace-content.component.scss'
})
export class WorkspaceContentPage {

  @Input()
  currentTabIndex: number = 0;
}
