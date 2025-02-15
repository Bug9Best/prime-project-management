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
export class UserService extends BaseService<ProjectsModel> {
  public override path: string = "users";

  getAllUser() {
    return this.client.get<any>(`${this.getBaseUrl}/getAllUser`);
  }

  blockUser(id: string) {
    return this.client.put<any>(`${this.getBaseUrl}/blockUser/${id}`, {});
  }

  unblockUser(id: string) {
    return this.client.put<any>(`${this.getBaseUrl}/unblockUser/${id}`, {});
  }

  checkPermission(id: string) {
    return this.client.get<any>(`${this.getBaseUrl}/checkPermission/${id}`);
  }
}
