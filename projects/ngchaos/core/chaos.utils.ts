/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */

export class ChaosUtils {
  static getBaseUrl(baseUrl:string, path:string): string {
    let baseUrl$ = baseUrl.endsWith("/")
      ? baseUrl.substring(0, -1)
      : baseUrl;

    return baseUrl$ + "/" + path;
  }
}
