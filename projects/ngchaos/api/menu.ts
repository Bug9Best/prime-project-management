import { Injectable } from "@angular/core";
import { ChaosDatabase } from "ngchaos/db";
import { ChaosUtils } from "ngchaos/core";

export interface CMenu {
  
}


@Injectable({ providedIn: 'root' })
export class CMenuService extends ChaosDatabase<CMenu> {
  override get baseUrl(): string {
    return ChaosUtils.getBaseUrl(this.config.uri.endpoint, "api/@chaos/menu");
  }
  
  updateStatus(data: any) {
    return this.client.put<CMenu>(`${this.baseUrl}/updateStatus`, data);
  }
  
  updateSort(data: any) {
    return this.client.put<CMenu>(`${this.baseUrl}/updateSort`, data);
  }
  
}