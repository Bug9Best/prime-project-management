import { Injectable } from '@angular/core';
import { BaseModel, BaseService } from '../base/base.service';

export enum ProjectPrivaryType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum ProjectType {
  SCRUM = 'SCRUM',
  WATERFALL = 'WATERFALL',
  KANBAN = 'KANBAN',
}

export interface ProjectsModel extends BaseModel {
  id: string;
  owner_id: string | number;
  project_name: string;
  project_description: number;
  project_type: string;
  project_privacy_type: string;
  project_code: string;
  is_disabled: boolean;

  owner_name?: string;
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
    return this.client.post<any>(`${this.getBaseUrl}/joinPublicProject`, data);
  }

  getProjectMembers(project_id: string | number) {
    return this.client.get<any>(`${this.getBaseUrl}/getProjectMembers`, {
      params: {
        project_id: project_id,
      },
    });
  }

  archiveProject(project_id: string | number) {
    return this.client.put<any>(`${this.getBaseUrl}/archiveProject`, {
      project_id: project_id,
    });
  }
}
