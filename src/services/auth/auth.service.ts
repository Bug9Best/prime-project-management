import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { environment } from '../../environments/environment';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<any> {

  signinWithGoogle(payload: any) {
    return this.client.post<any>(environment.apiUrl + 'auth/google', payload);
  }

  cookieService = inject(CookieService);

  getToken() {
    return this.cookieService.get('prime_token');
  }

  setToken(token: any) {
    this.cookieService.set('prime_token', token);
  }

  removeToken() {
    this.cookieService.delete('prime_token');
  }

  getEncodeUser() {
    return this.cookieService.get('prime_user');
  }

  getUserData() {
    const encodeUser = this.getEncodeUser();
    if (encodeUser) {
      try {
        return jwtDecode<JwtPayload>(encodeUser);
      } catch (error) {
        console.error('Invalid JWT token:', error);
        return null;
      }
    }
    return null;
  }

  setUserData(user: any) {
    this.cookieService.set('prime_user', user);
  }

  removeUserData() {
    this.cookieService.delete('prime_user');
  }

  isAdmin() {
    const user: any = this.getUserData();
    return user?.role === UserRole.Admin;
  }

  isUser() {
    const user: any = this.getUserData();
    return user?.role === UserRole.User;
  }
}
