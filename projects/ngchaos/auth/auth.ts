/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */

import { HttpClient } from "@angular/common/http";
import { Injectable, Injector, inject, signal } from '@angular/core';
import { Observable, tap } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { DialogService } from 'primeng/dynamicdialog';
import { ChaosConfig, ChaosUtils } from "ngchaos/core";
import { Router } from "@angular/router";
import { CAuth, CTokenUser } from "./auth.model";

@Injectable()
export class ChaosAuth {

  private injector = inject(Injector);
  
  token = signal<string|null>(null);
  user = signal<CTokenUser|null>(null);
  
  get key(): string {
    return "chaos" + this.config.appId;
  }
  
  get endpoint(): string {
    return ChaosUtils.getBaseUrl(this.config.endpoint, "api/chaos");
  }

  get dialog(): DialogService {
    return this.injector.get(DialogService);
  }

  get client(): HttpClient {
    return this.injector.get(HttpClient);
  }

  get config(): ChaosConfig {
    return this.injector.get(ChaosConfig);
  }
  
  get router(): Router {
    return this.injector.get(Router);
  }
  
  get jwtHelper(): JwtHelperService {
    return new JwtHelperService();
  }
  
  constructor() {
    let value = this.getValue();
    if(value) {
      this.setValue(value);
    }
    
    this.refreshToken();
  }
  
  /**
   * Get refresh token every 15 minutes
   */
  refreshToken(): void {
    setInterval(() => {
      let config = this.getValue();
      if(!config) {
        console.warn("[AUTH] Token not found");
        return;
      }
      
      if(this.isTokenExpired()) {
        console.warn("[AUTH] Token is expired");
        return;
      }
      
      if(!this.shouldRefreshToken()) {
        console.warn("[AUTH] Token not expired");
        return;
      }
      
      this.signInWithToken(config).subscribe({
        next: res => {
          console.info("[AUTH] Refresh token success");
          this.setValue(res);
        },
        error: err => {
          console.error("[AUTH] Refresh token expired");
          this.clearValue();
          this.routerSignIn();
        }
      });
      
    }, 300000);
  }
  
  /**
   * Should refresh token before expired
   */
  shouldRefreshToken(): boolean {
    const token = this.token();
    if (!token) {
        return false;
    }

    const expirationDate = this.getTokenExpirationDate();
    if (!expirationDate) {
        return false;
    }

    const timeDifference = expirationDate.getTime() - new Date().getTime();
    return timeDifference < 1000 * 60 * 5; // 5 minutes
  }
  
  /**
   * Sign In With Token
   */
  signInWithToken(config: CAuth): Observable<CAuth> {
    return this.client.post<CAuth>(`${this.endpoint}/signInWithToken`, { 
      client_id: this.config.clientId,
      token: config.refresh_token
    }).pipe(
      tap(res => this.setValue(res))
    );
  }
  
  /**
   * Sign In With Code
   */
  signInWithCode(code: string): Observable<CAuth> {
    return this.client.post<CAuth>(`${this.endpoint}/signInWithCode`, { 
      client_id: this.config.clientId,
      code: code
    }).pipe(
      tap(res => this.setValue(res))
    );
  }
  
  /**
   * JWT Decoded token and get profile
   */
  decodedToken<R>(token: string): R|null {
    if(token) {
      return this.jwtHelper.decodeToken<R>(token);
    } else {
      console.info("[AUTH] decodedToken: Token not found");
      return null;
    }
  }

  /**
   * JWT Get token expiration date
   */
  getTokenExpirationDate(): Date|null {
    if(this.token()) {
      return this.jwtHelper.getTokenExpirationDate(this.token()!);
    } else {
      console.info("[AUTH] getTokenExpirationDate: Token not found");
      return null;
    }
  }

  /**
   * JWT Check token is expired
   */
  isTokenExpired(): boolean {
    if(!this.token()) return true;
    return this.jwtHelper.isTokenExpired(this.token()!);
  }

  /**
   * User is logged in
   *
   * @return boolean
   */
  isLoggedIn(): boolean {
    return !this.isTokenExpired();
  }
  
  /**
   * User logout
   */
  signOut(): Observable<any> {
    return this.client
      .post<CAuth>(`${this.endpoint}/signOut`, {})
      .pipe(
        tap(res => {
          this.clearValue()
          window.location.reload();
        }
      ));
  }
  
  private setValue(res: CAuth): void {
    localStorage.setItem(this.key, JSON.stringify(res));
    
    this.token.set(res.access_token);
    this.user.set(this.decodedToken<CTokenUser>(res.access_token));
  }
  
  private getValue(): CAuth|null {
    let value = localStorage.getItem(this.key);
    return value ? JSON.parse(value) : null;
  }
  
  clearValue(): void {
    localStorage.removeItem(this.key);
  }
  
  /**
   * Redirect to login page
   */
  login(): void {
    let route = this.endpoint
      + "/signIn?client_id=" 
      + this.config.clientId;
    window.location.replace(route);
  }
  
  routerSignIn(): void {
    this.router.navigate([this.config.authPath]);
  }
  
}
