import { Component } from '@angular/core';
import { WorkspaceTopbar } from '../workspace-topbar/workspace-topbar.component';
import { WorkspaceContentPage } from '../workspace-content/workspace-content.component';
import { WorkspaceSidebar } from '../workspace-sidebar/workspace-sidebar.component';

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
