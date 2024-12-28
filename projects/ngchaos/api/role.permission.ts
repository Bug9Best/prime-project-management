import { Injectable } from "@angular/core";
import { ChaosDatabase } from "ngchaos/db";
import { ChaosUtils } from "ngchaos/core";

export interface CRolePermission {
  
}


@Injectable({ providedIn: 'root' })
export class CRolePermissionService extends ChaosDatabase<CRolePermission> {
  override get baseUrl(): string {
    return ChaosUtils.getBaseUrl(this.config.uri.endpoint, "api/@chaos/rolePermission");
  }
}