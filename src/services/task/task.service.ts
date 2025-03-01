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
  TODO = 0,
  DOING = 1,
  DONE = 2
}

export interface TaskModel extends BaseModel {
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
}

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService<TaskModel> {
  public override path: string = "task";


  getProjectTask(project_id: string | number) {
    return this.client.get<TaskModel[]>(`${this.getBaseUrl}/getProjectTask`, {
      params: {
        project_id: project_id
      }
    });
  }

  updateStatus(task: { id: string | number, status: TaskStatusModel }) {
    return this.client.put<TaskModel[]>(`${this.getBaseUrl}/updateStatus`, {
      id: task.id,
      status: task.status
    });
  }
}

