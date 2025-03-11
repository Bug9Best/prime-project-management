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
  assignee_name: string;

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

  assignTask(params: { task_id: string | number, user_id: string | number }) {
    return this.client.post<TaskScrumModel[]>(`${this.getBaseUrl}/assignTask`, {
      user_id: params.user_id,
      task_id: params.task_id,
      type: "SCRUM"
    });
  }

  moveToSprint(params: any) {
    return this.client.post<TaskScrumModel[]>(`${this.getBaseUrl}/moveToSprint`, params);
  }

  updateByField(dataId: any, params: any) {
    return this.client.put<TaskScrumModel[]>(`${this.getBaseUrl}/updateByField/${dataId}`,
      params
    );
  }

  updateStatus(task: { id: string | number, status: TaskStatusModel }) {
    return this.client.put<TaskScrumModel[]>(`${this.getBaseUrl}/updateStatus`, {
      id: task.id,
      status: task.status
    });
  }
}

