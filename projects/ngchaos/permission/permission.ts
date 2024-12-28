import { inject, Injectable } from "@angular/core";
import { ChaosAuth } from "ngchaos/auth";

@Injectable({ providedIn: 'root' })
export class ChaosPermission {

  auth = inject(ChaosAuth);

  private isRole(role: string): boolean {
    return true;
  }

  role(roles: string|string[]): boolean {
    // Foreach
    if(Array.isArray(roles)) {
      return roles.some(val => {
        return this.isRole(val);
      });
    }

    // Single
    if(typeof(roles) == "string") {
      return this.isRole(roles);
    }

    return false;
  }

}
