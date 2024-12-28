import liff from '@line/liff';

import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ChaosLiffConfig } from './liff.config';

@Injectable({ providedIn: 'root' })
export class ChaosLiff {

  constructor(private injector: Injector) {}

  private _init: boolean = false;
  private _profile: any;

  get liff() {
    return liff;
  }

  get config(): ChaosLiffConfig {
    return this.injector.get<ChaosLiffConfig>(ChaosLiffConfig);
  }

  init(): Observable<boolean> {
    return new Observable((resolve) => {
      if(!this.config.liffId) {
        this._init = false;
        return;
      }

      if(this._init) {
        resolve.next(true);
      }

      liff.init({
        liffId: this.config.liffId
      }).then(() => {
        this._init = true;
        resolve.next(true);
        console.log(">> [Loaded] LiffService");
      }).catch((e: any) => {
        this._init = false;
        console.error(">> [Error] LiffService: " + e);
      });
    });
  }

  IsLoggedIn(): boolean {
    if(!this._init) return false;
    let result = this.liff.isLoggedIn();
    console.log(">> isLoggedIn: " + result);
    return result;
  }

  getProfile(): Observable<any> {
    return new Observable(resolve => {
      if(!this._init) return;
      if(this._profile) {
        resolve.next(this._profile);
      }

      this.liff.getProfile()
      .then((profile:any) => {
        this._profile = profile;
        resolve.next(profile);
      })
      .catch((e:any) => {
        this._profile = null;
        resolve.error(e);
      });
    });
  }

  getAccessToken(): string|null {
    if(!this._init) return null;
    return this.liff.getAccessToken();
  }

  login(): void {
    if(!this.IsLoggedIn()) {
      this.liff.login();
    }
  }

  logout(): void {
    if(this.IsLoggedIn()) {
      this.liff.logout();
    }
  }
  
}
