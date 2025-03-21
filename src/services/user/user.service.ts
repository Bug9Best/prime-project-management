import { Injectable } from '@angular/core';
import { BaseModel, BaseService } from '../base/base.service';

export interface UserModel extends BaseModel {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserModel> {
  public override path: string = "users";

  getAllUser() {
    return this.client.get<any>(`${this.getBaseUrl}/getAllUser`);
  }

  updateRole(id: string, role: string) {
    return this.client.put<any>(`${this.getBaseUrl}/updateRole/${id}`, { role });
  }

  checkPermission(id: string) {
    return this.client.get<any>(`${this.getBaseUrl}/checkPermission/${id}`);
  }
}
