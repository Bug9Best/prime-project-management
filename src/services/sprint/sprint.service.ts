import { Injectable } from '@angular/core';
import { BaseModel, BaseService } from '../base/base.service';
import { TaskModel } from '../task/task.service';

export enum SprintStatus {
  UPCOMING = 0,
  ACTIVE = 1,
  CLOSED = 2
}

export interface SprintModel extends BaseModel {
  id: string;
  project_id: string | number;
  sprint_name: string;
  sprint_description: string;
  start_date: Date;
  end_date: Date;
  sprint_duration: string;
  status: SprintStatus;

  tasks: TaskModel[];
  completed_tasks: number;
  total_tasks: number;
}

@Injectable({
  providedIn: 'root'
})
export class SprintService extends BaseService<SprintModel> {
  public override path: string = "sprint";


  getProjectSprint(project_id: string | number) {
    return this.client.get<SprintModel[]>(`${this.getBaseUrl}/getProjectSprint`, {
      params: {
        project_id: project_id
      }
    });
  }

  updateStatus(sprint: { id: string | number, status: SprintStatus }) {
    return this.client.put<SprintModel[]>(`${this.getBaseUrl}/updateStatus`, {
      id: sprint.id,
      status: sprint.status
    });
  }
}

