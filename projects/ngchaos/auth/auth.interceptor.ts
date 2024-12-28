/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ChaosAuth } from '.';

@Injectable()
export class ChaosAuthInterceptor implements HttpInterceptor {
  constructor(
    public auth: ChaosAuth,
    public router: Router
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isLoggedIn()) {
      request = this.clone(request);
    }
    
    return next.handle(request);
  }

  clone(request: HttpRequest<any>): HttpRequest<any> {
    if(this.auth.token()) {
      return request.clone({
        setHeaders: {
          "Authorization" : "Bearer " + this.auth.token(),
        },
      });
    }
    return request;
  }

}

