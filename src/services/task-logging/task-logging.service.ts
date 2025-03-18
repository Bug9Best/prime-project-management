import { Injectable } from '@angular/core';
import { BaseModel, BaseService } from '../base/base.service';

export interface TaskLoggingModel extends BaseModel {
}

@Injectable({
  providedIn: 'root'
})
export class TaskLoggingService extends BaseService<TaskLoggingModel> {
  public override path: string = "task_logging";

  getLoggingData(project_id: string | number) {
    return this.client.get<TaskLoggingModel[]>(`${this.getBaseUrl}/getLoggingData`, {
      params: {
        project_id: project_id
      }
    });
  }

  comment(data: any) {
    return this.client.post<TaskLoggingModel[]>(`${this.getBaseUrl}/comment`, {
      data
    });
  }
}

