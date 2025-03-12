import { Injectable } from '@angular/core';
import { BaseModel, BaseService } from '../base/base.service';
import { Subject } from 'rxjs';


export interface ProjectMemberModel extends BaseModel {

}

@Injectable({
  providedIn: 'root'
})
export class ProjectMemberService extends BaseService<ProjectMemberModel> {
  public override path: string = "project_member";

  removeFromProject(user_id: string, project_id: string) {
    return this.client.post<any>(`${this.getBaseUrl}/removeFromProject`, {
      user_id, project_id
    }
    );
  }
}
