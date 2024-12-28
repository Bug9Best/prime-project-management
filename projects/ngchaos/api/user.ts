import { Injectable } from "@angular/core";
import { ChaosDatabase } from "ngchaos/db";
import { ChaosUtils } from "ngchaos/core";

export interface CUser {
  id: number;
  guid: string;
  name: string;
  email: string;
  picture?: CUserPicture;
  status: boolean;
}

export interface CUserPicture {
  path: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class ChaosUserService extends ChaosDatabase<CUser> {
  override get baseUrl(): string {
    return ChaosUtils.getBaseUrl(this.config.endpoint, "api/@chaos/user");
  }
}