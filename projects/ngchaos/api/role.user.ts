import { Injectable } from "@angular/core";
import { ChaosDatabase } from "ngchaos/db";
import { ChaosUtils } from "ngchaos/core";

export interface CRoleUser {
  
}


@Injectable({ providedIn: 'root' })
export class CRoleUserService extends ChaosDatabase<CRoleUser> {
  override get baseUrl(): string {
    return ChaosUtils.getBaseUrl(this.config.uri.endpoint, "api/@chaos/roleUser");
  }
  
  addUser(data: any) {
    return this.client.put<CRoleUser>(`${this.baseUrl}/addUser`, data);
  }
  
}