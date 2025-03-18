import { Injectable } from '@angular/core';
import { BaseModel, BaseService } from '../base/base.service';

export interface BoardModel extends BaseModel {
  id: string;
  project_id: string | number;
  board_name: string;
  is_disable: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BoardService extends BaseService<BoardModel> {
  public override path: string = "board";

  getProjectBoard(project_id: string | number) {
    return this.client.get<BoardModel[]>(`${this.getBaseUrl}/getProjectBoard`, {
      params: {
        project_id: project_id
      }
    });
  }
}
