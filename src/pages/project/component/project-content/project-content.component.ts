import { Component, Input, output, signal, SimpleChanges } from '@angular/core';
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
import { ProjectBacklogTask } from '../../project-backlog/project-backlog-task/project-backlog-task.component';

@Component({
  selector: 'project-content',
  imports: [
    ProjectDashboard,
    ProjectSprint,
    ProjectBacklog,
    ProjectBacklogTask,
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

  @Input()
  currentTabIndex: number = 0;

  sprintID: string = '';
  sprintDetailState = signal<boolean>(false);
  

  taskID: string = '';
  backlogDetailState = signal<boolean>(false);
  taskDetailState = signal<boolean>(false);

  ngOnChanges(changes: SimpleChanges) {
    let index = changes['currentTabIndex'].currentValue || 0;
    this.currentTabIndex = index;
  }

  onSetTabIndexEvent = output<number>();
  onSetTabIndex(index: number) {
    this.onSetTabIndexEvent.emit(index);
  }

  setSprintState(state: boolean, sprintID?: string) {
    this.sprintDetailState.set(state);
    if (sprintID) {
      this.sprintID = sprintID;
    }
  }

  setBacklogState(state: boolean, taskID?: string) {
    this.backlogDetailState.set(state);
    if (taskID) {
      this.taskID = taskID;
    }
  }

  setTaskState(state: boolean, taskID?: string) {
    this.taskDetailState.set(state);
    if (taskID) {
      this.taskID = taskID;
    }
  }
}
