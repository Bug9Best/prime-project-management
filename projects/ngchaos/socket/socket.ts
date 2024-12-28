/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */

import { Injectable, effect, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChaosUtils, ChaosConfig } from 'ngchaos/core';
import { ChaosSocketConfig } from './socket.config';
import { ChaosAuth } from 'ngchaos/auth';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

(window as any).Pusher = Pusher;

@Injectable({ providedIn: 'root' })
export class ChaosSocket {
  
  auth = inject(ChaosAuth);
  client = inject(HttpClient);
  config = inject(ChaosConfig);
  socketConfig = inject(ChaosSocketConfig);
  
  onNotification = new Subject<any>();
  
  constructor() {
    effect(() => {
      const user = this.auth.user();
      if(user) {
        this.listenNotifications(user);
      }
    })
  }
  
  get endpoint(): string {
    return ChaosUtils.getBaseUrl(this.config.endpoint, 'api/@chaos/socket');
  }

  /**
   * Connect to the socket server
   * @returns void
   */
  private _echo?: Echo<any>;
  get echo(): Echo<any> {
    if (!this._echo) {
      this._echo = new Echo({
        broadcaster: 'pusher',
        key: this.socketConfig.key,
        wsHost: this.socketConfig.host,
        wsPort: this.socketConfig.port,
        wssPort: this.socketConfig.port,
        cluster: 'mt1',
        forceTLS: false,
        encrypted: true,
        disableStats: true,
        enabledTransports: ['ws', 'wss'],
        namespace: 'App.Events',
        authEndpoint: this.endpoint,
        auth: {
          headers: {
            Authorization: `Bearer ${this.auth.token()}`
          }
        },
      });
    }
    
    (window as any).Echo = this._echo;
    return this._echo;
  }
  
  listenNotifications(user: any): Observable<any> {
    this.echo
      .private('user.' + user.uid)
      .notification((e: any) => {
        this.onNotification.next(e);
      });
    return this.onNotification.asObservable();
  }
  
  user<R>(event: string): Observable<R> {
    return new Observable<R>(observer => {
      if(this.auth.user()) {
        this.echo.private('user.' + this.auth.user()!.uid)
          .listen(event, (res: R) => {
            observer.next(res);
          });
      }
    });
  }

}
