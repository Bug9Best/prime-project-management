import { Injectable } from "@angular/core";
import { ChaosDatabase } from "ngchaos/db";
import { ChaosUtils } from "ngchaos/core";

export interface CRole {
  
}


@Injectable({ providedIn: 'root' })
export class CRoleService extends ChaosDatabase<CRole> {
  override get baseUrl(): string {
    return ChaosUtils.getBaseUrl(this.config.uri.endpoint, "api/@chaos/role");
  }
}