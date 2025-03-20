import { Injectable } from '@angular/core';
import { BaseModel, BaseService } from '../base/base.service';

export interface FeedbackModel extends BaseModel {
  id: string;
  function: number;
  design: number;
  speed: number;
  satisfaction: number;
  content: string | number;
  submitter_name: string;
  submitter_email: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService<FeedbackModel> {
  public override path: string = "feedback";

  createFeedback(data: any) {
    return this.client.post<any>(`${this.getBaseUrl}/createFeedback`, data);
  }

  getByUser(userId: string) {
    return this.client.get<any>(`${this.getBaseUrl}/getByUser`, {
      params: {
        user_id: userId,
      }
    });
  }
}
