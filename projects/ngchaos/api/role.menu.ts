import { Injectable } from "@angular/core";
import { ChaosDatabase } from "ngchaos/db";
import { ChaosUtils } from "ngchaos/core";

export interface CRoleMenu {
  
}


@Injectable({ providedIn: 'root' })
export class CRoleMenuService extends ChaosDatabase<CRoleMenu> {
  override get baseUrl(): string {
    return ChaosUtils.getBaseUrl(this.config.uri.endpoint, "api/@chaos/roleMenu");
  }
  
  updateStatus(data: any) {
    return this.client.put<CRoleMenu>(`${this.baseUrl}/updateStatus`, data);
  }
  
}