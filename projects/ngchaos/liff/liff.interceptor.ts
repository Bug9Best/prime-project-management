/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChaosLiff } from './liff';

@Injectable()
export class ChaosLiffInterceptor implements HttpInterceptor {

  constructor(public liff: ChaosLiff) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.liff.IsLoggedIn()) {
      request = this.clone(request);
    }
    return next.handle(request);
  }

  clone(request: HttpRequest<any>): HttpRequest<any> {
    if(this.liff.getAccessToken()) {
      return request.clone({
        setHeaders: {
          "X-Liff-Token" : "Bearer " + this.liff.getAccessToken(),
        },
      });
    }
    return request;
  }

}

