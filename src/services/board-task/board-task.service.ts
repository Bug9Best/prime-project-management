import { Injectable } from '@angular/core';
import { BaseModel, BaseService } from '../base/base.service';

export interface BoardTaskModel extends BaseModel {
  id: string;
  project_id: string | number;
  board_name: string;
  is_disable: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BoardTaskService extends BaseService<BoardTaskModel> {
  public override path: string = "board_task";

  getProjectBoard(project_id: string | number) {
    return this.client.get<BoardTaskModel[]>(`${this.getBaseUrl}/getProjectBoard`, {
      params: {
        project_id: project_id
      }
    });
  }

  assignTask(params: { task_id: string | number, user_id: string | number }) {
    return this.client.post<BoardTaskModel[]>(`${this.getBaseUrl}/assignTask`, {
      user_id: params.user_id,
      task_id: params.task_id,
      type: "KANBAN"
    });
  }

  updateByField(dataId: any, params: any) {
    return this.client.put<BoardTaskModel[]>(`${this.getBaseUrl}/updateByField/${dataId}`,
      params
    );
  }

  updateBoard(task_id: string | number, board_id: any) {
    return this.client.put(`${this.getBaseUrl}/updateBoard`, {
      task_id: task_id,
      board_id: board_id
    });
  }
}
