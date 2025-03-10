import { Injectable } from '@angular/core';
import { BaseModel, BaseService } from '../base/base.service';

export enum TaskTypeModel {
  TASK = "TASK",
  SUBTASK = "SUBTASK",
  BUG = "BUG"
}

export enum TaskPriorityModel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export enum TaskStatusModel {
  TODO = 1,
  DOING = 2,
  DONE = 3
}

export interface TaskScrumModel extends BaseModel {
  id: string;
  project_id: string | number;
  sprint_id: string | number;
  task_name: string;
  task_description: string;
  task_type: TaskTypeModel;
  task_priority: TaskPriorityModel;
  level: string;
  parent_task_id: string;
  start_date: string;
  end_date: string;
  estimate_time: string;
  actual_time: string;
  status: TaskStatusModel;
  assignee: any;

  sprint_name: string;
  project_name: string;
  logs: any;
  project_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskScrumService extends BaseService<TaskScrumModel> {
  public override path: string = "task_scrum";

  getProjectTask(project_id: string | number) {
    return this.client.get<TaskScrumModel[]>(`${this.getBaseUrl}/getProjectTask`, {
      params: {
        project_id: project_id
      }
    });
  }

  getProjectOpenTask(project_id: string | number) {
    return this.client.get<TaskScrumModel[]>(`${this.getBaseUrl}/getProjectOpenTask`, {
      params: {
        project_id: project_id
      }
    });
  }

  moveToSprint(params: any) {
    return this.client.post<TaskScrumModel[]>(`${this.getBaseUrl}/moveToSprint`, params);
  }

  updateStatus(task: { id: string | number, status: TaskStatusModel }) {
    return this.client.put<TaskScrumModel[]>(`${this.getBaseUrl}/updateStatus`, {
      id: task.id,
      status: task.status
    });
  }
}

