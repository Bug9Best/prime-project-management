import { Component, Input } from '@angular/core';
import { ProjectDashboard } from '../../project-dashboard/project-dashboard.component';
import { ProjectSprint } from '../../project-sprint/project-sprint.component';
import { ProjectBacklog } from '../../project-backlog/project-backlog.component';
import { ProjectTask } from '../../project-task/project-task.component';
import { ProjectResource } from '../../project-resource/project-resource.component';
import { ProjectSetting } from '../../project-setting/project-setting.component';
import { ProjectMember } from '../../project-member/project-member.component';
import { ProjectGantt } from '../../project-gantt/project-gantt.component';
import { ProjectBoard } from '../../project-board/project-board.component';

@Component({
  selector: 'project-content',
  imports: [
    ProjectDashboard,
    ProjectSprint,
    ProjectBacklog,
    ProjectGantt,
    ProjectBoard,
    ProjectTask,
    ProjectResource,
    ProjectMember,
    ProjectSetting
  ],
  templateUrl: './project-content.component.html',
  styleUrl: './project-content.component.scss'
})
export class ProjectContent {
  @Input()
  currentTabIndex: number = 0;
}
