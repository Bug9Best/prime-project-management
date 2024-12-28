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
import { ChaosAuth } from '.';

/**
 * Chaos Auth Guard
 * 
 * @deprecated Use ChaosPermissionGuard instead
 * @param route 
 * @returns 
 */
export const ChaosAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot): boolean|Observable<boolean> => {
  const auth = inject(ChaosAuth);
  const isLoggedIn = auth.isLoggedIn();
  if(!isLoggedIn) {
    auth.routerSignIn();
  }
  return isLoggedIn;
}
