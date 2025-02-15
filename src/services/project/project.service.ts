import { Injectable } from '@angular/core';
import { BaseModel, BaseService } from '../base/base.service';

export interface ProjectsModel extends BaseModel {
  id: string;
  project_name: string | number;
  project_description: number;
  project_type: string;
  project_privacy_type: string;
  project_code: string;
  is_disabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService<ProjectsModel> {
  public override path: string = "project";

  getAllJoinedProject(user_id: string | number) {
    return this.client.get<any>(`${this.getBaseUrl}/getAllJoinedProject`, {
      params: {
        user_id: user_id,
      },
    });
  }

  getAllPublicProject(user_id: string | number) {
    return this.client.get<any>(`${this.getBaseUrl}/getAllPublicProject`, {
      params: {
        user_id: user_id,
      },
    });
  }

  createProject(data: any) {
    return this.client.post<any>(`${this.getBaseUrl}/createProject`, data);
  }

  joinPrivateProject(data: any) {
    return this.client.post<any>(`${this.getBaseUrl}/joinPrivateProject`, data);
  }

  joinPublicProject(data: any) {
    return this.client.post<any>(`${this.getBaseUrl}/joinPublicProject` ,data);
  }
}
