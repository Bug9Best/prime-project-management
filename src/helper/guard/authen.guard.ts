import { CanActivateFn } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const authenGuard: CanActivateFn = () => {
  let authService = inject(AuthService);
  let state = authService.getToken() ? true : false;
  if (!state) {
    window.location.href = environment.authenUrl;
  }
  return state
};