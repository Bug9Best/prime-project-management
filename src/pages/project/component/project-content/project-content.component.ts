import { Component, input, signal } from '@angular/core';
import { ProjectDashboard } from '../../project-dashboard/project-dashboard.component';
import { ProjectSprint } from '../../project-sprint/project-sprint.component';
import { ProjectBacklog } from '../../project-backlog/project-backlog.component';
import { ProjectTask } from '../../project-task/project-task.component';
import { ProjectResource } from '../../project-resource/project-resource.component';
import { ProjectSetting } from '../../project-setting/project-setting.component';
import { ProjectMember } from '../../project-member/project-member.component';
import { ProjectGantt } from '../../project-gantt/project-gantt.component';
import { ProjectBoard } from '../../project-board/project-board.component';
import { ProjectSprintDetail } from '../../project-sprint/project-sprint-detail/project-sprint-detail.component';
import { ProjectTaskDetail } from '../../project-task/project-task-detail/project-task-detail.component';

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
    ProjectSetting,
    ProjectSprintDetail,
    ProjectTaskDetail
  ],
  templateUrl: './project-content.component.html',
  styleUrl: './project-content.component.scss'
})
export class ProjectContent {

  currentTabIndex = input<number>(0);

  sprintID: string = '';
  sprintDetailState = signal<boolean>(false);

  taskID: string = '';
  taskDetailState = signal<boolean>(false);

  setSprintState(state: boolean, sprintID?: string) {
    this.sprintDetailState.set(state);
    if (sprintID) {
      this.sprintID = sprintID;
    }
  }

  setTaskState(state: boolean, taskID?: string) {
    this.taskDetailState.set(state);
    if (taskID) {
      this.taskID = taskID;
    }
  }
}
