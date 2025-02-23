import { Injectable } from '@angular/core';
import { BaseModel, BaseService } from '../base/base.service';

export interface SprintModel extends BaseModel {
  id: string;
  project_id: string | number;
  sprint_name: string;
  sprint_description: string;
  start_date: Date;
  end_date: Date;
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
}

