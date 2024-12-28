/**
 * @license
 * Copyright 2024 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */

import { Injectable } from "@angular/core";

@Injectable()
export class ChaosConfig {
  appId: string = "default";
  clientId: string = "default";
  title: string = "APP_TITLE";
  subTitle: string = "APP_SUBTITLE";
  icon: string = "assets/icon.png";
  endpoint: string = "http://localhost:8080";
  databaseUrl: string = "http://localhost:8080/api";
  authPath: string = "/main/auth";
  home: string = "/";
}