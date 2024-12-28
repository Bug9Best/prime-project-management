/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ChaosUtils, ChaosConfig } from "ngchaos/core";
import { ChaosResponse } from "./chaos.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ChaosService {
  
  client = inject(HttpClient);
  config = inject(ChaosConfig);
  endpoint: string = this.config.endpoint;
  path: string = 'api/chaos';
  
  /**
   * The base url of the database or the table
   * @returns string
   */
  get baseUrl(): string {
    return ChaosUtils.getBaseUrl(this.endpoint, this.path);
  }
  
  setPath(path: string): ChaosService {
    this.path = path;
    return this;
  }
  
  setEndpoint(endpoint: string): ChaosService {
    this.endpoint = endpoint;
    return this;
  }
  
  get<R>(type: string): Observable<ChaosResponse<R>> {
    return this.client.get<ChaosResponse<R>>(this.baseUrl, {
      params: { type: type }
    });
  }

  call<R>(type: string, data: any = {}): Observable<ChaosResponse<R>> {
    return this.client.post<ChaosResponse<R>>(this.baseUrl, {
      type: type,
      data: data
    });
  }
  
}