import { Injectable } from "@angular/core";
import { CBaseModel, ChaosDatabase } from "ngchaos/db";
import { ChaosUtils } from "ngchaos/core";

export interface CNotification extends CBaseModel {
  type: string;
  title: string;
  message: string;
  read_at?: string;
}

@Injectable({ providedIn: 'root' })
export class CNotificationService extends ChaosDatabase<CNotification> {
  override get baseUrl(): string {
    return ChaosUtils.getBaseUrl(this.config.endpoint, "api/@chaos/notify");
  }
  
  alert(options?: any) {
    return this.client.get<any>(`${this.baseUrl}/alert`, {
      params: this.params(options)
    });
  }
  
  read(id: any) {
    return this.client.get<any>(`${this.baseUrl}/read/${id}`);
  }
  
}
