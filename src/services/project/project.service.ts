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

  createProject(project: any) {
    return this.client.post<any>(`${this.getBaseUrl}/createProject`, project);
  }
}
