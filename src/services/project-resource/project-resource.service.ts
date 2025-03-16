import { Injectable } from '@angular/core';
import { BaseModel, BaseService } from '../base/base.service';
import { Subject } from 'rxjs';

export enum ProjectResourceType {
  CONTENT = 'CONTENT',
  ATTACHMENT = 'ATTACHMENT',
}

export interface FileAttachment extends BaseModel {
  name: string;
  size: string | number;
  type: string;
  file_url: string;
}

export interface ProjectResourceModel extends BaseModel {
  id: string;
  project_id: string | number;
  owner_id: string | number;
  topic: string;
  resource_type: ProjectResourceType;
  tag: string[];
  content?: string | null;
  url_link?: string | null;
  attachment?: FileAttachment[] | null;

  owner_name: string;
  owner_image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectResourceService extends BaseService<ProjectResourceModel> {
  public override path: string = "project_resource";

  private stateReload = new Subject<boolean>();
  stateReload$ = this.stateReload.asObservable();

  setStateRoload(stateReload: boolean) {
    this.stateReload.next(stateReload);
  }

  createProjectResource(data: any) {
    return this.client.post<any>(`${this.getBaseUrl}/createProjectResource`, data);
  }
}
