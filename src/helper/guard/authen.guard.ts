import { CanActivateFn } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const authenGuard: CanActivateFn = () => {
  let authService = inject(AuthService);
  let state = authService.getToken() ? true : false;
  if (!state) {
    window.location.href = 'https://accounts.google.com/o/oauth2/auth' +
      '?client_id=346056074798-079u0u6mjr0pc30po19pf6ju5ejdvdnu.apps.googleusercontent.com' +
      '&redirect_uri=' + encodeURIComponent(environment.authenUrl) +
      '&response_type=token' +
      '&scope=email profile';
  }
  return state
};