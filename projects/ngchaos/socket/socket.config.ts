/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */

import { Injectable } from "@angular/core";

@Injectable()
export class ChaosSocketConfig {
  key: string = "default";
  host: string = "127.0.0.1";
  port: number = 443;
}

