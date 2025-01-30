import { Component } from '@angular/core';
import { WorkspaceTopbar } from '../component/workspace-topbar/workspace-topbar.component';
import { WorkspaceContentPage } from '../component/workspace-content/workspace-content.component';
import { WorkspaceSidebar } from '../component/workspace-sidebar/workspace-sidebar.component';

@Component({
  selector: 'workspace',
  standalone: true,
  imports: [
    WorkspaceTopbar,
    WorkspaceContentPage,
    WorkspaceSidebar,
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspacePage {

  currentTabIndex: number = 0;
}
