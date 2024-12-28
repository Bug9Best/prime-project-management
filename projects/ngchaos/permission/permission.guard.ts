/**
 * @license
 * Copyright 2023 BugGolf
 * Found in the LICENSE file at https://github.com/BugGolf
 *
 * @author BugGolf
 */
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { ChaosAuth } from 'ngchaos/auth';
import { ChaosPermission } from './permission';

export class ChaosPermissionGuard {

  /**
   * Check if user is authenticated
   * 
   * @returns 
   */
  static Authenticated(): CanActivateFn {
    return (route: ActivatedRouteSnapshot): boolean|Observable<boolean> => {
      const auth = inject(ChaosAuth);
      const isLoggedIn = auth.isLoggedIn();
      if(!isLoggedIn) {
        console.warn("[PermissionGuard] User is not authenticated");
        auth.routerSignIn();
      }
      return isLoggedIn;
    }
  }

  /**
   * Check if user role is allowed
   * 
   * @returns 
   */
  static Role(role: string|string[]): CanActivateFn {
    return (route: ActivatedRouteSnapshot): boolean|Observable<boolean> => {
      const isRole = inject(ChaosPermission).role(role);
      if(!isRole) {
        console.warn("[PermissionGuard] User role is not allowed");
      }
      return isRole;
    }
  }
}
